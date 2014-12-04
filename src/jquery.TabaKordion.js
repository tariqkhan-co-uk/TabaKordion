(function($, window, undefined) {
	"use strict";
	var	pluginName = 'TabaKordion',
		defaults = {
			accordion:		true,	// Function as accordion by default else function as tabs
			openFirst:		true,	// Open first panel on page load if true unless indicated by select class
			multiSelect:	true,	// Open multiple panels simultaneously if true (false fails WAI specifications)
			showHide:		false	// Function as show/hide region
		};
	function TabaKordion(element, options) {
		this.element = element;
		this.options = $.extend( {}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.$TabaKordion = $(element);
		if(this.$TabaKordion.hasClass('tabs')) {
			this.options.accordion = false;
		} else if(this.$TabaKordion.hasClass('nomultiselect')) {
			this.options.multiSelect = false;
		} else if(this.$TabaKordion.hasClass('showhide')) {
			this.options.showHide = true;
		}
		this.$tabs = this.options.showHide ? this.$TabaKordion : this.$TabaKordion.find('.tab');
		this.$panels = this.options.showHide ? $(this.$TabaKordion.attr('href')) : this.$TabaKordion.children('.panel');
		this.keys = new keyCodes();
		this.bindEventHandlers();
		this.init();
	}
	// Object defining names for key codes
	function keyCodes() {
		// Trigger keys
		this.tab		= 9;
		this.enter		= 13;
		this.esc		= 27;
		this.space		= 32;
		// Scroll keys
		this.pageup		= 33;
		this.pagedown	= 34;
		this.end		= 35;
		this.home		= 36;
		// Direction keys
		this.left		= 37;
		this.up			= 38;
		this.right		= 39;
		this.down		= 40;
	}
	// focusable: jQuery extension to add :focusable selector to get all focusable elements in a panel; credit to ajpiano on jQuery forums
	$.extend($.expr[':'], {
		focusable: function(element) {
			var	nodeName = element.nodeName.toLowerCase(),
				tabIndex = $(element).attr('tabindex');
			// Element and all its ancestors must be visible
			if(($(element)[(nodeName == 'area' ? 'parents' : 'closest')](':hidden').length) == true) {
				return false;
			}
			// If tabindex is defined its value must be greater than 0
			if(!isNaN(tabIndex) && tabIndex < 0) {
				return false;
			}
			// If element is standard form control it must not be disabled
			if(/input|select|textarea|button|object/.test(nodeName) == true) {
				return !element.disabled;
			}
			// If element is link href must be defined
			if((nodeName == 'a' ||  nodeName == 'area') == true) {
				return (element.href.length > 0);
			}
			// Unknown or non-focusable element
			return false;
		}
	});
	TabaKordion.prototype = {
		init: function() {
			if(this.options.showHide) {
				this.$tabs.attr('aria-expanded', 'false').attr('aria-controls', this.$panels.attr('id')).prepend('<span>Show</span> ');
				this.$panels.attr('aria-expanded', 'false').attr('aria-labelledby', this.$tabs.attr('id')).attr('role', 'region').attr('tabindex', '-1').addClass('showhide-region').hide();
			} else {
				this.$panels.attr('role', 'tabpanel').attr('aria-hidden', 'true').hide();
				this.$tabs.attr('role', 'tab').attr('aria-selected', 'false').attr('tabindex', '-1');
				if(this.options.accordion) {
					if(this.options.multiSelect) {
						this.$TabaKordion.attr('multiselectable', true);
					}
					this.$tabs.attr('aria-expanded', 'false').append(' <span class="visually-hidden">(collapsed)</span>');
				} else {
					this.$tabs.find('a').each(function() {
						$(this).replaceWith('<span>'+$(this).text()+'</span>');
					});
				}
			}
			var anchor = window.location.hash;
			if(anchor && $(anchor).length) {
				this.$tabs.removeClass('selected');
				$(anchor).addClass('selected');
				if(this.options.showHide) {
					anchor = anchor.substring(1);
					if(this.$tabs.attr('id') === anchor || this.$panels.attr('id') === anchor) {
						this.toggleRegion();
					}
				}
			}
			if(!this.options.showHide) {
				var $tab = this.$tabs.filter('.selected');
				if(!$tab.length && this.options.openFirst) {
					$tab = this.$tabs.first();
				}
				$tab.addClass('selected').attr('aria-selected', 'true').attr('tabindex', '0');
				if(this.options.accordion) {
					$tab.attr('aria-expanded', 'true').find('.visually-hidden').text('(expanded)');
				}
				this.$TabaKordion.find('#'+$tab.attr('aria-controls')).show().attr('aria-hidden', 'false');
			}
		},
		bindEventHandlers: function() {
			// Create reference so pointer can be accessed in functions with events
			var thisObj = this;
			// Bind handlers for headings
			this.$tabs.keydown(function(e) {
				return thisObj.tabKeyDownHandler($(this), e);
			});
			this.$tabs.click(function(e) {
				return thisObj.tabClickHandler($(this), e);
			});
			this.$tabs.focus(function(e) {
				return thisObj.tabFocusHandler($(this), e);
			});
			this.$tabs.blur(function(e) {
				return thisObj.tabBlurHandler($(this), e);
			});
			// Bind handlers for panel focusable elements
			if(!this.options.showHide) {
				this.$panels.keydown(function(e) {
					return thisObj.panelElementsKeyDownHandler($(this), e);
				});
			}
			if(this.options.accordion) {
				this.$panels.click(function(e) {
					return thisObj.panelElementsClickHandler($(this), e);
				});
			}
			if(this.options.showHide) {
				this.$panels.blur(function(e) {
					return thisObj.panelBlurHandler($(this), e);
				});
			}
		},
		// Toggle the display of the show/hide region
		toggleRegion: function() {
			var $tab = this.$tabs;
			this.$panels.slideToggle(function() {
				if($(this).attr('aria-expanded') === 'false') {
					$(this).attr('aria-expanded', 'true').focus();
					$tab.attr('aria-expanded', 'true').addClass('selected').find('span').html('Hide');
				} else {
					$(this).attr('aria-expanded', 'false');
					$tab.attr('aria-expanded', 'false').removeClass('selected').find('span').html('Show');
				}
			});
		},
		// Show/hide panel associated with tab header
		togglePanel: function($tab) {
			if(!this.options.accordion) {
				this.$panels.attr('aria-hidden', 'true').hide();
			} else if(this.options.accordion && !this.options.multiSelect) {
				this.$tabs.attr('aria-expanded', 'false').find('.visually-hidden').text('(collapsed)');
				this.$panels.attr('aria-hidden', 'true').slideUp();
			}
			var $panel = this.$TabaKordion.find('#'+$tab.attr('aria-controls'));
			if($panel.attr('aria-hidden') === 'true') {
				$panel.attr('aria-hidden', 'false');
				if(this.options.accordion) {
					$tab.attr('aria-expanded', 'true').find('.visually-hidden').text('(expanded)');
					$panel.slideDown();
				} else {
					$panel.show();
				}
			} else {
				$panel.attr('aria-hidden', 'true');
				if(this.options.accordion) {
					$tab.attr('aria-expanded', 'false').find('.visually-hidden').text('(collapsed)');
					$panel.slideUp();
				} else {
					$panel.hide();
				}
			}
		},
		// Focus new tab header and if tabs; current panel is hidden and new panel is displayed
		switchTabs: function($curTab, $newTab) {
			$curTab.removeClass('selected focus').attr('tabindex', '-1').attr('aria-selected', 'false');
			if(!this.options.accordion) {
				this.$TabaKordion.find('#'+$curTab.attr('aria-controls')).hide().attr('aria-hidden', 'true');
				this.$TabaKordion.find('#'+$newTab.attr('aria-controls')).show().attr('aria-hidden', 'false');
			}
			$newTab.addClass('selected').attr('aria-selected', 'true').attr('tabindex', '0').focus();
		},
		// Tab header key down event handler: return true = propagating, false = consuming event
		tabKeyDownHandler: function($tab, e) {
			if(e.altKey || (this.options.showHide && (e.keyCode !== this.keys.enter && e.keyCode !== this.keys.space))) {
				return true;
			}
			switch(e.keyCode) {
				case this.keys.enter:
				case this.keys.space: {
					if(this.options.accordion) {
						this.options.showHide ? this.toggleRegion() : this.togglePanel($tab);
						e.stopPropagation();
						return false;
					}
					return true;
				}
				case this.keys.left:
				case this.keys.up: {
					if(e.ctrlKey) { // Ctrl+arrow moves focus from panel elements to open tab header
					} else {
						var	tabIndex = this.$tabs.index($tab),
							// If first tab new tab is last tab else new tab is previous tab
							$newTab = tabIndex == 0 ? this.$tabs.last() : this.$tabs.eq(tabIndex - 1);
						this.switchTabs($tab, $newTab);
					}
					e.stopPropagation();
					return false;
				}
				case this.keys.right:
				case this.keys.down: {
					var	tabIndex = this.$tabs.index($tab),
						// If last tab new tab is first tab else new tab is next tab
						$newTab = tabIndex == this.$tabs.length - 1 ? this.$tabs.first() : this.$tabs.eq(tabIndex + 1);
					this.switchTabs($tab, $newTab);
					e.stopPropagation();
					return false;
				}
				case this.keys.home: {
					this.switchTabs($tab, this.$tabs.first());
					e.stopPropagation();
					return false;
				}
				case this.keys.end: {
					this.switchTabs($tab, this.$tabs.last());
					e.stopPropagation();
					return false;
				}
			}
		},
		tabClickHandler: function($tab, e) {
			if(this.options.showHide) {
				this.toggleRegion();
			} else {
				$tab.addClass('selected').attr('tabindex', '0').attr('aria-selected', 'true');
				this.$tabs.not($tab).attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');
				this.togglePanel($tab);
			}
			if(this.options.accordion) {
				e.stopPropagation();
				return false;
			}
			return true;
		},
		tabFocusHandler: function($tab, e) {
			$tab.addClass('focus');
			return true;
		},
		tabBlurHandler: function($tab, e) {
			$tab.removeClass('focus');
			return true;
		},
		// Panel key down event handler: return true = propagating, false = consuming event
		panelElementsKeyDownHandler: function($panel, e) {
			if(e.altKey) {
				return true;
			}
			switch(e.keyCode) {
				case this.keys.tab: {
					var	$focusable	= $panel.find(':focusable'),
						curIndex	= $focusable.index($(e.target)),
						panelIndex	= this.$panels.index($panel),
						numPanels	= this.$panels.length;
					if(e.shiftKey) {
						// If first focusable item in panel; find preceding expanded panel focusable items and focus it. Do not process if no preceding panel or focusable items
						if(curIndex == 0 && panelIndex > 0) {
							// Iterate through previous panels until we find one expanded with focusable elements
							for(var index = panelIndex - 1; index >= 0; index--) {
								var	$prevPanel = this.$panels.eq(index),
									$prevTab = $('#' + $prevPanel.attr('aria-labelledby'));
								// Get focusable items in panel
								$focusable.length = 0;
								$focusable = $prevPanel.find(':focusable');
									if($focusable.length > 0) {
									// Focusable items in panel exists; set focus to last item
									$focusable.last().focus();
									// Reset aria-selected state of tabs
									this.$tabs.attr('aria-selected', 'false').removeClass('selected');
									// Set associated tabs aria-selected state
									$prevTab.attr('aria-selected', 'true').addClass('selected');
									e.stopPropagation;
									return false;
								}
							}
						}
					} else if (panelIndex < numPanels) {
						// If last focusable item in panel; find following expanded panel focusable items and focus it. Do not process if no preceding panel or focusable items
						if(curIndex == $focusable.length - 1) {
							// Iterate through following panels until we find one expanded with focusable elements
							for(var index = panelIndex + 1; index < numPanels; index++) {
								var	$nextPanel = this.$panels.eq(index),
									$nextTab = $('#'+$nextPanel.attr('aria-labelledby'));
								// Get focusable items in panel
								$focusable.length = 0;
								$focusable = $nextPanel.find(':focusable');
								if($focusable.length > 0) {
									// Focusable items in panel; set focus to first item
									$focusable.first().focus();
									// Reset aria-selected state of tabs
									this.$tabs.attr('aria-selected', 'false').removeClass('selected');
									// Set associated tabs aria-selected state
									$nextTab.attr('aria-selected', 'true').addClass('selected');
									e.stopPropagation;
									return false;
								}
							}
						}
					}
					break;
				}
				case this.keys.esc:
				case this.keys.left:
				case this.keys.up: {
					if(e.keyCode != this.keys.esc && !e.ctrlKey) {
						return true;
					}
					$('#'+$panel.attr('aria-labelledby')).focus();
					e.stopPropagation();
					return false;
				}
				case this.keys.pageup:
				case this.keys.pagedown: {
					if(!e.ctrlKey) {
						return true;
					}
					var	$tab = this.$tabs.filter('.selected'),
						curIndex = this.$tabs.index($tab);
					if(e.keyCode == this.keys.pageup) {
						// If first tab focus on last else focus previous tab
						var	$newTab = curIndex == 0 ? this.$tabs.last() : this.$tabs.eq(curIndex - 1);
					} else {
						// If last tab focus on first else focus on next tab
						var	$newTab = curIndex == this.$tabs.length - 1 ? this.$tabs.first() : this.$tabs.eq(curIndex + 1);
					}
					this.switchTabs($tab, $newTab);
					e.stopPropagation();
					e.preventDefault();
					return false;
				}
			}
			return true;
		},
		panelBlurHandler: function($panel, e) {
			this.$tabs.removeClass('selected');
			return true;
		},
		panelElementsClickHandler: function($panel, e) {
			if(this.options.showHide) {
				this.$tabs.addClass('selected');
			} else {
				var $tab = $('#'+$panel.attr('aria-labelledby')).attr('tabindex', '0').attr('aria-selected', 'true').addClass('selected');
				this.$tabs.not($tab).attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');
			}
			return true;
		}
	};
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if(!$.data(this, 'plugin_'+pluginName)) {
				$.data(this, 'plugin_'+pluginName, new TabaKordion(this, options));
			}
		});
	}
})(jQuery, window);
