import React from 'react';

class MediaKit extends React.Component {
    render() {
        let mediakit = this.props.mediakit.map(item => {
            if (item.price > 1) {
                return (
                    <tr key={item.name}>
                        <td>{item.name}</td><td className="right-align">{item.price}</td>
                    </tr>
                );
            }
        });
        return (
            <table className="bordered border grey-text text-darken-3">
                <thead>
                    <tr>
                        <th style={{width:'100%'}}>
                            <h5 className="center">Media Kit</h5>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {mediakit}
                </tbody>
            </table>
        );
    }
}

export default MediaKit;