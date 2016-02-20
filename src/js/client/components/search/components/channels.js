import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';

const Channel = (props) => {
    if (!props.channel ||
        (props.minimal && !props.channels[props.channel + '_range_from'])) {
        return <div></div>;
    }
    return (
        <div className={'col ' + (props.minimal ? 's12' : 's3')}
             style={{position: 'relative'}}>
            <div style={{
                width: '40px',
                height: '50px',
                padding: '10px 10px 10px 0',
                marginTop: '10px',
                position: 'absolute'
            }}><img
                src={'/assets/images/social/' + props.channel + '.png'}
                style={{width: '100%', opacity: '.4'}}
            />
            </div>
            <div style={{
                paddingLeft: '40px'
            }}>
                {props.channel.indexOf('_range_') !== -1 ?
                <InputText
                    type="number"
                    id={props.channel + '_range_from'}
                    val={props.channels[props.channel + '_range_from']}
                    parent={props.parent || ''}
                    onChange={props.onChange}
                /> :
                <InputText
                    type="number"
                    id={props.channel}
                    val={props.channels[props.channel]}
                    parent={props.parent || ''}
                    onChange={props.onChange}
                />}
            </div>
        </div>
    );
};

const Channels = (props) => {
    if (!props.channels) {
        return <div></div>;
    }
    return (
        <div className="row">
            <Channel
                channel="facebook"
                {...props}
            />
            <Channel
                channel="twitter"
                {...props}
            />
            <Channel
                channel="pinterest"
                {...props}
            />
            <Channel
                channel="instagram"
                {...props}
            />
            <Channel
                channel="googleplus"
                {...props}
            />
            <Channel
                channel="blog"
                {...props}
            />
            <Channel
                channel="youtube"
                {...props}
            />
            <Channel
                channel="snapchat"
                {...props}
            />
        </div>
    );
};

export default Channels;
