import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<div>
					<Link to={`/search`}>Search</Link> | <Link to={`/projects`}>Projects</Link> | <Link to={`/lists`}>Lists</Link>
				</div>
				{this.props.children}
			</div>
		);
	}
}