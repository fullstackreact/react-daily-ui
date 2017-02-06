// Data
var data = {
	image: 'https://static1.squarespace.com/static/55acc005e4b098e615cd80e2/5777d3433e00be9cc0d8e3f6/5777d384d482e9910faaf472/1467473313295/13.jpg?format=2500w',
	settings: [
		{
			name: 'contrast',
			value: '100%',
		},
		{
			name: 'hue',
			value: '0deg'
		},
		{
			name: 'brightness',
			value: '100%'
		},
		{
			name: 'saturate',
			value: '100%'
		},
		{
			name: 'sepia',
			value: '0%'
		}
	],
	filters: [
		{
			id: 0,
			name: 'Noir',
			settings: [
				{
					name: 'contrast',
					value: '138%',
				},
				{
					name: 'hue',
					value: '0deg'
				},
				{
					name: 'brightness',
					value: '122%'
				},
				{
					name: 'saturate',
					value: '0%'
				},
				{
					name: 'sepia',
					value: '0%'
				}
			]
		},
		{
			id: 1,
			name: 'Aged',
			settings: [
				{
					name: 'contrast',
					value: '94%',
				},
				{
					name: 'hue',
					value: '-54deg'
				},
				{
					name: 'brightness',
					value: '92%'
				},
				{
					name: 'saturate',
					value: '100%'
				},
				{
					name: 'sepia',
					value: '44%'
				}
			]
		},
		{
			id: 2,
			name: 'Whiteout',
			settings: [
				{
					name: 'contrast',
					value: '32%',
				},
				{
					name: 'hue',
					value: '0deg'
				},
				{
					name: 'brightness',
					value: '173%'
				},
				{
					name: 'saturate',
					value: '0%'
				},
				{
					name: 'sepia',
					value: '0%'
				}
			]
		},
		{
			id: 3,
			name: 'Vintage',
			settings: [
				{
					name: 'contrast',
					value: '164%',
				},
				{
					name: 'hue',
					value: '0deg'
				},
				{
					name: 'brightness',
					value: '47%'
				},
				{
					name: 'saturate',
					value: '0%'
				},
				{
					name: 'sepia',
					value: '100%'
				}
			]
		}
	]
};

// App Container
var App = React.createClass({
	getDefaultProps: function() {
		return(data);
	},
	handleChange: function(e) {
		var value = e.target.value;
		var name = e.target.id;
		switch (name) {
			case 'contrast':
				this.props.settings[0].value = value + '%';
				break;
			case 'hue':
				this.props.settings[1].value = value + 'deg';
				break;
			case 'brightness':
				this.props.settings[2].value = value + '%';
				break;
			case 'saturate':
				this.props.settings[3].value = value + '%';
				break;
			case 'sepia':
				this.props.settings[4].value = value + '%';
				break;
		}
		this.forceUpdate();
	},
	handleClick: function(e) {
		var index = e.target.id.replace('filter-','');
		// console.log(this.props.filters[index].settings);
		this.props.settings[0].value = this.props.filters[index].settings[0].value;
		this.props.settings[1].value = this.props.filters[index].settings[1].value;
		this.props.settings[2].value = this.props.filters[index].settings[2].value;
		this.props.settings[3].value = this.props.filters[index].settings[3].value;
		this.props.settings[4].value = this.props.filters[index].settings[4].value;
		this.forceUpdate();
		
	},
	render: function() {
		return(
			<div className="App">
				<ImageBG image={this.props.image} />
				<Settings onClick={this.handleClick} onChange={this.handleChange} data={this.props} />
			</div>	
		)
	}
});

// Image Background
var ImageBG = React.createClass({
	render: function() {
		return (
			<div className="ImageBG" style={{backgroundImage: 'url('+ this.props.image + ')'}}></div>
		)
	}
});

// Settings Container
var Settings = React.createClass({
	render: function() {
		return (
			<div className="Settings">
				<div className="MainWrapper">
					<Sidebar onChange={this.props.onChange} settings={this.props.data.settings} />
					<ImageContainer settings={this.props.data.settings} image={this.props.data.image} />
				</div>
				<FilterList onClick={this.props.onClick} filters={this.props.data.filters} image={this.props.data.image} />
			</div>
		)
	}
});

// Sidebar
var Sidebar = React.createClass({
	render: function() {
		var onChange = this.props.onChange;
		var settings = this.props.settings.map(function(setting, i) {
			return <Setting onChange={onChange} name={setting.name} value={setting.value} />;
		});
		
		return (
			<div className="Sidebar">
				<div className="Title">Reactagram v1.0</div>
				{settings}
			</div>
		);
	}
});

var Setting = React.createClass({
	render: function() {
		
		if(this.props.name == 'hue') {
			
			var value = this.props.value.replace('deg','');
			
			return (
				<div className="Setting">
					<label><div>{this.props.name}</div><div>{value}</div></label>
					<input refs={this.props.name} min="-360" max="360" step="1" onChange={this.props.onChange} id={this.props.name} type="range" defaultValue={this.props.value} />
				</div>
			);
			
		} else if(this.props.name == 'contrast' || this.props.name == 'brightness') {
			
			var value = this.props.value.replace('%','');
			
			return (
				<div className="Setting">
					<label><div>{this.props.name}</div><div>{value}</div></label>
					<input refs={this.props.name} min="0" max="200" step="1" onChange={this.props.onChange} id={this.props.name} type="range" defaultValue={this.props.value} />
				</div>
			);
			
		} else {
			
			var value = this.props.value.replace('%','');
			
			return (
				<div className="Setting">
					<label><div>{this.props.name}</div><div>{value}</div></label>
					<input refs={this.props.name} min="0" max="100" step="1" onChange={this.props.onChange} id={this.props.name} type="range" defaultValue={this.props.value} />
				</div>
			);
			
		}
		
	}
});

// Image Container
var ImageContainer = React.createClass({
	render: function() {
		return (
			<div className="ImageContainer">
				<Image settings={this.props.settings} image={this.props.image} />
			</div>
		);
	}
});

// Image
var Image = React.createClass({
	render: function() {
		
		if(!this.props.settings == []) {
			var filterString = "";
			var filters = this.props.settings.map(function(filter, i) {
				
				if(filter.name == 'hue') {
					filterString = filterString + 'hue-rotate(' + filter.value + ') ';
				} else {
					filterString = filterString + filter.name + '(' + filter.value + ') ';
				}

				return filterString;
			});
		}
		
		
		var style = {
			backgroundImage: 'url(' + this.props.image + ')',
			webkitFilter: filterString
		};
		
		if(!this.props.id) {
			var id = 'filter-image';
		} else {
			var id = this.props.id;
		}
		
		return (
			<div id={id} className="Image" style={style}></div>
		);

	}
});

// FilterList
var FilterList = React.createClass({	
	render: function() {
		var image = this.props.image;
		var onClick = this.props.onClick;
		
		var filters = this.props.filters.map(function(filter, i) {
			return <Filter onClick={onClick} id={filter.id} image={image} settings={filter.settings} />
		});
		
		return (
			<div className="FilterList">
				{filters}
			</div>
		);
	}
});

// Filter
var Filter = React.createClass({
	render: function() {
		return (
			<div className="Filter" onClick={this.props.onClick}>
				<Image id={'filter-' + this.props.id} settings={this.props.settings} image={this.props.image} />
			</div>
		);
	}
});

// Render
ReactDOM.render(
	<App />,
	document.getElementById('app')
);