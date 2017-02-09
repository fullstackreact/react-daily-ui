import React, {Component} from 'react'
import Input from './Input'
class Modal extends Component {
	render() {
		return (
			<div className="Modal">
				<form
					onSubmit={this.props.onSubmit}
					className="ModalForm">
					<Input
						id="name"
						type="text"
						placeholder="Name" />
					<Input
						id="username"
						type="email"
						placeholder="email" />
					<Input
						id="password"
						type="password"
						placeholder="password" />
			
					<button>
						Sign Up <i className="fa fa-fw fa-chevron-left"></i>
					</button>

					</form>

			</div>
		);
	}
};

export default Modal
