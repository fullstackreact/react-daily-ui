import React, {Component} from 'react'

class Input extends Component {
	render() {
		return (
			<div className="Input">
				<input
					id={this.props.name}
					autoComplete="false"
					required
					type={this.props.type}
					placeholder={this.props.placeholder}/>
				<label htmlFor={this.props.name}></label>
			</div>
		);
	}
};

export default Input
