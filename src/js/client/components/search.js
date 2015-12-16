import React from 'react';

export default class Search extends React.Component {

	render() {
        jQuery(document).ready(function() {
            jQuery('.modal-trigger').leanModal();
        });
		return (
			<div>
				<a className="modal-trigger waves-effect waves-light btn" href="#modal1">Modal</a>
				<div id="modal1" className="modal">
					<div className="modal-content">
						<h4>Modal Header</h4>
						<p>A bunch of text</p>
					</div>
					<div className="modal-footer">
						<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
					</div>
				</div>
			</div>
		);
	}
}