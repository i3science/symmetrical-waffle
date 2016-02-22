import React from 'react'; // eslint-disable-line no-unused-vars
import moment from 'moment';
import { Link } from 'react-router';

import Card from '../../common/Card';

export default (props) => {
	if (!props.representatives || props.representatives.length === 0) {
		return (
			<div>No results...</div>
		);
	}
	return (
		<div>
		{props.representatives.map((rep) => {
			return (
				<Card key={rep._id}>
					<Link to={props.link.replace(':id', rep._id)}>
						<div><strong className="teal-text">Organization:</strong> {rep.client.name}</div>
						<div><strong className="teal-text">Contact Name:</strong> {rep.name.first} {rep.name.last}</div>
						<div><strong className="teal-text">Date Created:</strong> {moment(rep.created).format('MMM DD, YYYY')}</div>
					</Link>
				</Card>
			);
		})}
		</div>
	);
};