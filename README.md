# TabaKordion

### jQuery Accessible Tabs and Accordion

This plugin has been built to satisfy, by default, all requirements listed within the W3C WAI-ARIA 1.0 Authoring Practices for tabs and accordions. The plugin has been written with the intention of satifying accessiblity requirements to the highest level.

> Check this [WAI-ARIA 1.0 Authoring Practices](http://www.w3.org/TR/wai-aria-practices/) for more details.

The TabaKordion plugin can be configured to work differently by use of classes, data-attributes or using the common method of parsing configuration data through jQuery. Note that, if configured, the plugin may fail accessibility in some areas.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
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
└── TabaKordion.jquery.json
```

#### [demo/](https://github.com/tariqkhan-co-uk/TabaKordion/tree/master/demo)

Contains a simple HTML file to demonstrate the TabaKordion plugin.

#### [dist/](https://github.com/tariqkhan-co-uk/TabaKordion/tree/master/dist)

Contains the Production ready TabaKordion plugin JavaScript files with a minified version.

#### [src/](https://github.com/tariqkhan-co-uk/TabaKordion/tree/master/src)

Contains the TabaKordion plugin JavaScript file. This file may not be Production ready and may contain incomplete development code.

#### [CONTRIBUTING.md](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/CONTRIBUTING.md)

File containing information for TabaKordion contributers.

#### [LICENSE](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/LICENSE)

File containing licencing information for TabaKordion

#### [README.md](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/README.md)

You are "reading" it.

#### [TabaKordion.jquery.json](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/TabaKordion.jquery.json)

Package manifest file used to publish plugins in jQuery Plugin Registry.

> Check this [Package Manifest Guide](http://plugins.jquery.com/docs/package-manifest/) for more details.

## Guides

### Configuration

The TabaKordion plugin currently has 2 configuration options (more coming soon).

#### Accordion

To use TabaKordion in it's default configuration, which is as an Accordion:

	<div id="accordion" class="tabakordion accordion" role="tablist" multiselectable="true">
		<h2 id="tab1" class="tab" aria-controls="panel1">Keyboard Support</h2>
		<div id="panel1" class="panel" aria-labelledby="tab1">
			<p>If focus is on a tab button:</p>
			<ul>
				<li><strong>Left / Up Arrow:</strong> Show the previous tab</li>
				<li><strong>Right / Down Arrow:</strong> Show the next tab</li>
				<li><strong>Home:</strong> Show the first tab</li>
				<li><strong>End:</strong> Show the last tab</li>
				<li><strong>Enter / Space:</strong> Expand / Collapse panel</li>
			</ul>
			<p>If focus is on an element in a tab panel:</p>
			<ul>
				<li><strong>Control + Up Arrow/Left Arrow:</strong> Set focus on the tab button for the currently displayed tab.</li>
				<li><strong>Control + Page Up:</strong> Show the previous tab and set focus on its corresponding tab button. Shows the last tab in the panel if current tab is the first one.</li>
				<li><strong>Control + Page Down:</strong> Show the next tab and set focus on its corresponding tab button. Shows the first tab in the panel if current tab is the last one.</li>
				<li><strong>Tab:</strong> Move focus to next focusable element in panel. If focus is on last focusable element, move focus to first focusable element of next expanded panel or, if no more expanded panels or focusable elements, to first focusable element following tab panel in the page.</li>
				<li><strong>Shift + Tab:</strong> The reverse of Tab.</li>
			</ul>
			<p><strong>NOTE:</strong> Google Chrome does not propagate Control+ Page Up or Control+ Page Down to the web page when multiple tabs are open. This key combination will not function correctly in that case.</p>
		</div>
		<h2 id="tab2" class="tab" aria-controls="panel2">Heading sample</h2>
		<div id="panel2" class="panel" aria-labelledby="tab2">
			<h3>Subheading</h3>
			<p>Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content <a href=".">Sample content</a> Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content <a href=".">Sample content</a> Sample content</p>
		</div>
		<h2 id="tab3" class="tab" aria-controls="panel3">Lorem Ipsum</h2>
		<div id="panel3" class="panel" aria-labelledby="tab3">
			<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into <a href=".">electronic typesetting</a>, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
		</div>
	</div>

The above uses no configuration and is in it's default state.

The "accordion" class assigned to the wrapping div element is not required.

#### Tabs

To use TabaKordion as Tabs, add the class "tabs" to the wrapping div element or replace the "accordion" class (if exists):

	<div id="tabs" class="tabakordion tabs">
		<ul class="tablist" role="tablist">
			<li id="tab4" class="tab" aria-controls="panel4"><a href="#panel4">Keyboard Support</a></li>
			<li id="tab5" class="tab" aria-controls="panel5"><a href="#panel5">Heading sample</a></li>
			<li id="tab6" class="tab" aria-controls="panel6"><a href="#panel6">Lorem Ipsum</a></li>
		</ul>
		<div id="panel4" class="panel" aria-labelledby="tab4">
			<h2>Keyboard Support</h2>
			<p>If focus is on a tab:</p>
			<ul>
				<li><strong>Left / Up Arrow:</strong> Show the previous tab</li>
				<li><strong>Right / Down Arrow:</strong> Show the next tab</li>
				<li><strong>Home:</strong> Show the first tab</li>
				<li><strong>End:</strong> Show the last tab</li>
			</ul>
			<p>If focus is on a tab panel element:</p>
			<ul>
				<li><strong>Control + Up Arrow/Left Arrow:</strong> Set focus on the tab button for the currently displayed tab.</li>
				<li><strong>Control + Page Up:</strong> Show the previous tab and set focus on its corresponding tab button. Shows the last tab in the panel if current tab is the first one.</li>
				<li><strong>Control + Page Down:</strong> Show the next tab and set focus on its corresponding tab button. Shows the first tab in the panel if current tab is the last one.</li>
				<li><strong>Tab:</strong> Move focus to next focusable element in panel. If focus is on last focusable element, move focus to first focusable element of next expanded panel or, if no more expanded panels or focusable elements, to first focusable element following tab panel in the page.</li>
				<li><strong>Shift + Tab:</strong> The reverse of Tab.</li>
			</ul>
			<p><strong>NOTE:</strong> Google Chrome does not propagate Control+ Page Up or Control+ Page Down to the web page when multiple tabs are open. This key combination will not function correctly in that case.</p>
		</div>
		<div id="panel5" class="panel" aria-labelledby="tab5">
			<h2>Heading sample</h2>
			<p>Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content <a href=".">Sample content</a> Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content Sample content <a href=".">Sample content</a> Sample content</p>
		</div>
		<div id="panel6" class="panel" aria-labelledby="tab6">
			<h2>Lorem Ipsum</h2>
			<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into <a href=".">electronic typesetting</a>, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
		</div>
	</div>

#### Preselected panel

To set the panel that should be visible on page load (default is first panel), simply include the selected class on the tab class.

## Author

TabaKordion was coded by [Tariq Khan](http://www.tariqkhan.co.uk).

## Contributing

Check [CONTRIBUTING.md](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/tariqkhan-co-uk/TabaKordion/releases) for detailed changelog.

## License

[MIT License](https://github.com/tariqkhan-co-uk/TabaKordion/blob/master/LICENSE) © Tariq Khan
