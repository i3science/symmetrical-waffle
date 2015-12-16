import React from 'react';
var ProgressBar = require('progressbar.js');

class Score extends React.Component {
    constructor() {
        super();
        this.animate = this.animate.bind(this);
    }
    componentDidMount() {
        this.animate();
    }
    animate() {
        var circle = new ProgressBar.Circle('.score.'+this.props.id, {
            color: '#b2dfdb',
            strokeWidth: 5,
            trailWidth: 5,
            duration: 1000,
            easing: 'easeInOut',
            text: {
                value: '0'
            },
            step: function(state, bar) {
                bar.setText((bar.value() * 100).toFixed(0));
            }
        });
        circle.animate(this.props.score/100);
    }
    render() {
        return (
            <div className={'score '+this.props.id} style={{width:this.props.size+'px',height:this.props.size+'px',margin:'0 auto'}}></div>
        );
    }
}

export default Score;