/*
* jQuery TabaKordion - v1.0.0
* A fully accessible to WAI specification; tabs and accordion jQuery plugin.
* http://www.tariqkhan.co.uk/
*
* Made by Tariq Khan
* Under MIT License
*/
;(function($, window, document, undefined) {
	var	pluginName = 'TabaKordion',
		defaults = {
			accordion:	true,
			openFirst:	true
		};
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend( {}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.$TabaKordion = $(element);
		this.$tabs = this.$TabaKordion.find('.tab');
		this.$panels = this.$TabaKordion.children('.panel');
		if(this.$TabaKordion.hasClass('tabs')) {
			this.options.accordion = false;
		}
		this.keys = new keyCodes();
		this.bindEventHandlers();
		this.init();
	}
	// Object defining names for keycodes
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
	// focusable is a jQuery extension to add :focusable selector; credit to ajpiano on jQuery forums
	// Used to get all focusable elements in a panel
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
	Plugin.prototype = {
		// Initialise TabaKordion by applying ARIA attributes and hiding all panels except class selected or first
		init: function() {
			this.$panels.attr('role', 'tabpanel').attr('aria-hidden', 'true').hide();
			this.$tabs.attr('role', 'tab').attr('aria-selected', 'false').attr('tabindex', '-1')
			if(this.options.accordion) {
				this.$tabs.attr('aria-expanded', 'false').append(' <span class="visually-hidden">(collapsed)</span>');
			} else {
				this.$tabs.find('a').each(function() {
					$(this).replaceWith('<span>'+$(this).text()+'</span>');
				});
			}
			var anchor = window.location.hash;
			if(anchor && $(anchor).length) {
				this.$tabs.removeClass('selected');
				$(anchor).addClass('selected');
			}
			var $tab = this.$tabs.filter('.selected');
			if(!$tab.length && this.options.openFirst) {
				$tab = this.$tabs.first();
			}
			$tab.addClass('selected').attr('aria-selected', 'true').attr('tabindex', '0');
			if(this.options.accordion) {
				$tab.attr('aria-expanded', 'true').find('.visually-hidden').text('(expanded)');
			}
			this.$TabaKordion.find('#'+$tab.attr('aria-controls')).show().attr('aria-hidden', 'false');
		},
		// Bind event handlers for headings and panels
		bindEventHandlers: function() {
			// Create reference so pointer can be accessed in functions with events
			var thisObj = this;
			// Bind handlers for tab headings
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
			this.$panels.keydown(function(e) {
				return thisObj.panelElementsKeyDownHandler($(this), e);
			});
			if(this.options.accordion) {
				this.$panels.click(function(e) {
					return thisObj.panelElementsClickHandler($(this), e);
				});
			}
		},
		// Display/Hide panel associated with tab header and bind/unbind keydown handler to its panel focusable elements
		togglePanel: function($tab) {
			if(!this.options.accordion) {
				this.$panels.attr('aria-hidden', 'true').hide();
			}
			$panel = this.$TabaKordion.find('#'+$tab.attr('aria-controls'));
			if($panel.attr('aria-hidden') == 'true') {
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
		// Give focus to new tab header and if tabs; current panel is hidden and new panel is displayed
		switchTabs: function($curTab, $newTab) {
			$curTab.removeClass('selected focus').attr('tabindex', '-1').attr('aria-selected', 'false');
			if(!this.options.accordion) {
				this.$TabaKordion.find('#'+$curTab.attr('aria-controls')).hide().attr('aria-hidden', 'true');
				this.$TabaKordion.find('#'+$newTab.attr('aria-controls')).show().attr('aria-hidden', 'false');
			}
			$newTab.addClass('selected').attr('aria-selected', 'true').attr('tabindex', '0').focus();
		},
		// Tab heading key down event handler: return true if propagating, false if consuming event
		tabKeyDownHandler: function($tab, e) {
			if(e.altKey) {
				return true;
			}
			switch(e.keyCode) {
				case this.keys.enter:
				case this.keys.space: {
					if(this.options.accordion) {
						this.togglePanel($tab);
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
		// Tab heading click event handler
		tabClickHandler: function($tab, e) {
			$tab.addClass('selected').attr('tabindex', '0').attr('aria-selected', 'true');
			this.$tabs.not($tab).attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');
			this.togglePanel($tab);
			if(this.options.accordion) {
				e.stopPropagation();
				return false;
			}
			return true;
		},
		// Tab heading focus event handler
		tabFocusHandler: function($tab, e) {
			$tab.addClass('focus');
			return true;
		},
		// Tab heading blur event handler
		tabBlurHandler: function($tab, e) {
			$tab.removeClass('focus');
			return true;
		},
		// Panel key down event handler: return true if propagating else false if consuming event
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
						// If this is first focusable item in panel; find preceding expanded panel that has focusable items and set focus to it. Do not process if no preceding panel or focusable items
						if(curIndex == 0 && panelIndex > 0) {
							// Iterate through previous panels until we find one that is expanded and has focusable elements
							for(var index = panelIndex - 1; index >= 0; index--) {
								var	$prevPanel = this.$panels.eq(index),
									$prevTab = $('#' + $prevPanel.attr('aria-labelledby'));
								// Get the focusable items in panel
								$focusable.length = 0;
								$focusable = $prevPanel.find(':focusable');
									if($focusable.length > 0) {
									// Focusable items in panel exists; set focus to the last item
									$focusable.last().focus();
									// Reset aria-selected state of the tabs
									this.$tabs.attr('aria-selected', 'false').removeClass('selected');
									// Set associated tab's aria-selected state
									$prevTab.attr('aria-selected', 'true').addClass('selected');
									e.stopPropagation;
									return false;
								}
							}
						}
					} else if (panelIndex < numPanels) {
						// If this is the last focusable item in the panel; find nearest following expanded panel that has focusable items and set focus to it. Do not process if no preceding panel or focusable items
						if(curIndex == $focusable.length - 1) {
							// Iterate through following panels until we find one that is expanded and has focusable elements
							for(var index = panelIndex + 1; index < numPanels; index++) {
								var	$nextPanel = this.$panels.eq(index),
									$nextTab = $('#'+$nextPanel.attr('aria-labelledby'));
								// Get focusable items in panel
								$focusable.length = 0;
								$focusable = $nextPanel.find(':focusable');
								if($focusable.length > 0) {
									// There are focusable items in panel; set focus to first item
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
		// Panel click event handler for accordion only to highlight clicked paneld
		panelElementsClickHandler: function($panel, e) {
			var $tab = $('#'+$panel.attr('aria-labelledby')).attr('tabindex', '0').attr('aria-selected', 'true').addClass('selected');
			this.$tabs.not($tab).attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');
			return true;
		}
	};
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if(!$.data(this, 'plugin_'+pluginName)) {
				$.data(this, 'plugin_'+pluginName, new Plugin(this, options));
			}
		});
	};
})(jQuery, window, document);
