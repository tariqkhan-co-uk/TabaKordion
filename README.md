# TabaKordion

### jQuery Accessible Tabs, Accordion and Show/Hide regions

This plugin has been built to satisfy, by default, all requirements listed within the W3C WAI-ARIA 1.0 Authoring Practices for tabs, accordions and show/hide regions. The plugin has been written with the intention of satisfying accessibility requirements to the highest level.

> Check [WAI-ARIA 1.0 Authoring Practices](http://www.w3.org/TR/wai-aria-practices/) for more details.

The TabaKordion plugin can be configured to work differently by use of classes or by using the common method of parsing configuration data through calling the jQuery plugin. Note that, if configured, the plugin may fail accessibility in some areas.

## Demo

> [Demo](https://cdn.rawgit.com/tariqkhan-co-uk/TabaKordion/master/demo/v2.2.1.html) of TabaKordion.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.TabaKordion.min.js"></script>
	```

3. Call the plugin:

	```javascript
	$("#element").TabaKordion();
	```

## Structure

The basic structure of the project is given in the following way:

```
├── css/
│   ├── basic.css
│   └── monotone.css
├── demo/
│   └── index.html
├── dist/
│   ├── jquery.TabaKordion.js
│   └── jquery.TabaKordion.min.js
├── src/
│   └── jquery.TabaKordion.js
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── TabaKordion.jquery.json
└── TabaKordion.png
```

#### [css/](https://github.com/tariqkhan-co-uk/TabaKordion/tree/master/css)

Contains a simple CSS file to apply basic styling to the TabaKordion plugin. This stylesheet is not required and you should apply your own styling to suite the design of you website or page. The Monotone CSS file is an example of how you could apply your own styling.

#### [demo/](https://github.com/tariqkhan-co-uk/TabaKordion/tree/master/demo)

Contains a simple HTML file to demonstrate the semantic, error free HTML mark-up of the TabaKordion plugin.

#### [dist/](https://github.com/tariqkhan-co-uk/TabaKordion/tree/master/dist)

Contains the Production ready TabaKordion plugin JavaScript file with a minified version.

#### [src/](https://github.com/tariqkhan-co-uk/TabaKordion/tree/master/src)

Contains the TabaKordion plugin JavaScript file. This file may not be Production ready and may contain incomplete development code. Please use the version in the dist folder for anything and everything.

#### [CONTRIBUTING.md](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/CONTRIBUTING.md)

File containing information for TabaKordion contributors.

#### [LICENSE](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/LICENSE)

File containing licensing information for TabaKordion

#### [README.md](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/README.md)

You are "reading" it.

#### [TabaKordion.jquery.json](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/TabaKordion.jquery.json)

Package manifest file used to publish plugins to the jQuery Plugin Registry.

> Check this [Package Manifest Guide](http://plugins.jquery.com/docs/package-manifest/) for more details.

#### [TabaKordion.png](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/TabaKordion.png)

A logo image for the plugin.

## Guides

### Configuration

The TabaKordion plugin currently has 3 key configuration options (including the default behaviour) and 2 other minor option.

As mentioned earlier, you can call the plugin by using the following JavaScript:

```javascript
$("#element").TabaKordion();
```

'#element' being the 'id' attribute assigned to the wrapping 'div' element. This could also be a 'class' attribute instead of the 'id'. I find it easier to use the following instead:

```javascript
$(".TabaKordion").TabaKordion();
```

This way, any time you wish to use the plugin, you can assign the 'TabaKordion' class to the wrapping 'div' element.

#### 1. Accordion

The following is the minimum HTML mark-up required to use TabaKordion in it's default configuration, which is as an Accordion:

```xhtml
<div class="tabakordion accordion">
	<h3 id="tab1" class="tab" aria-controls="panel1">
		Heading for panel one
	</h3>
	<div id="panel1" class="panel" aria-labelledby="tab1">
		Sample content for panel one.
	</div>
	<h3 id="tab2" class="tab" aria-controls="panel2">
		Heading for panel two
	</h3>
	<div id="panel2" class="panel" aria-labelledby="tab2">
		Sample content for panel two.
	</div>
	<h3 id="tab3" class="tab" aria-controls="panel3">
		Heading for panel three
	</h3>
	<div id="panel3" class="panel" aria-labelledby="tab3">
		Sample content for panel three.
	</div>
</div>
```

The class 'accordion' assigned to the wrapping 'div' element is not required and is used purely for styling.

The remaining attributes are required for the plugin to function correctly as an accordion.

The above uses no configuration and the plugin will be functioning in it's default state.

#### 1.1 Multi select

The default behaviour of the accordion is to allow having multiple panels open simultaneously. This is as per WAI requirements. Websites commonly use an accordion where only 1 panel is open at any time. Clicking on the heading for a closed panel will close the currently open panel then open the selected panel. This can be achieved by assigning the 'nomultiselect' class to the wrapping 'div' element.

```xhtml
<div class="tabakordion accordion nomultiselect">
	...
</div>
```

#### 1.2 Preselected panel

No panel will be open by default when the page loads. If the URL contains an anchor at the end of the page name and that anchor is either the ID of the accordion header or accordion panel or is an element within a panel; that panel will be open by default overriding the "default first panel" behaviour.

To manually configure a panel to be open by default, you simply need to assign the 'selected' class on the panel header.

```xhtml
<div class="tabakordion accordion">
	<h3 id="tab1" class="tab selected" aria-controls="panel1">
		Heading for panel one
	</h3>
	...
</div>
```

#### 2. Tabs

The following is the minimum HTML mark-up required to use TabaKordion as Tabs:

```xhtml
<div class="tabakordion tabs">
	<ul>
		<li id="tab4" class="tab" aria-controls="panel4">
			<a href="#panel4">Heading for panel one</a>
		</li>
		<li id="tab5" class="tab" aria-controls="panel5">
			<a href="#panel5">Heading for panel two</a>
		</li>
		<li id="tab6" class="tab" aria-controls="panel6">
			<a href="#panel6">Heading for panel three</a>
		</li>
	</ul>
	<div id="panel4" class="panel" aria-labelledby="tab4">
		Sample content for panel one.
	</div>
	<div id="panel5" class="panel" aria-labelledby="tab5">
		Sample content for panel two.
	</div>
	<div id="panel6" class="panel" aria-labelledby="tab6">
		Sample content for panel three.
	</div>
</div>
```

The class 'tabs' assigned to the wrapping 'div' element is required both for styling and to configure the TabaKordion plugin to function as Tabs.

The remaining attributes are required for the plugin to function correctly as tabs.

#### 2.1 Preselected panel

The first panel will be open by default when the page loads. If the URL contains an anchor at the end of the page name and that anchor is either the ID of the tab header or tab panel or is an element within a tab panel; that panel will be open by default overriding the "default first panel" behaviour.

To manually configure a panel to be open by default, you simply need to assign the 'selected' class on the panel header.

```xhtml
<div class="tabakordion tabs">
	<ul>
		<li id="tab4" class="tab selected" aria-controls="panel4">
			<a href="#panel4">Heading for panel one</a>
		</li>
		...
</div>
```

#### 2. Show/hide region

The following is the minimum HTML mark-up required to use TabaKordion as show/hide region:

```xhtml
<a href="#showhide-region" id="showhide" class="tabakordion showhide">
	Sample text
</a>
<div id="showhide-region">
	<p>Sample content</p>
</div>
```

The class 'showhide' assigned to the wrapping 'div' element is required both for styling and to configure the TabaKordion plugin to function as show/hide region.

The remaining attributes are required for the plugin to function correctly as show/hide region.

If the URL contains an anchor at the end of the page name and that anchor is either the ID of the show/hide link or region or is an element within the region; the region will be open by default.

## Author

TabaKordion was coded by [Tariq Khan](http://www.tariqkhan.co.uk).

## Contributing

Check [CONTRIBUTING.md](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/tariqkhan-co-uk/TabaKordion/releases) for detailed change log.

## License

[MIT License](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/LICENSE) © Tariq Khan
