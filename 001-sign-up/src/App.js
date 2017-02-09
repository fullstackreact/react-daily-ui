import React, {Component}from 'react';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from './Modal'

class App extends Component {
    constructor() {
        super();
        this.state = {
            mounted: false,
            child: null
        }
    }

    componentDidMount() {
		this.setState({
            mounted: true
        });
	}

	handleSubmit(event) {
		this.setState({ mounted: true });
		event.preventDefault();
	}

	render() {
        let child = null;
		if(this.state.mounted) {
			child = (<Modal onSubmit={this.handleSubmit} />);
		}

		return(
			<div className="App">
				<ReactCSSTransitionGroup
					transitionName="example"
					transitionEnterTimeout={400}
					transitionLeaveTimeout={500}>
                    {child}
				</ReactCSSTransitionGroup>

			</div>
		);
	}
};

export default App;
