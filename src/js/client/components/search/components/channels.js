import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';

const Channel = (props) => {
    if (!props.channel) {
        return <div></div>;
    }
    return (
        <div className={'col ' + (props.minimal ? 's12' : 's3')}
             style={{position: 'relative'}}>
            <div style={{
                width: '35px',
                height: '35px',
                margin: '19px 0',
                padding: '7px',
                position: 'absolute',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '50%'
            }}><img
                src={'/assets/images/social/' + props.channel + '.png'}
                style={{width: '100%'}}
            />
            </div>
            <div style={{
                paddingLeft: '50px'
            }}>
                {props.channel.indexOf('_range_') !== -1 ?
                <InputText
                    type="number"
                    id={props.channel + '_range_from'}
                    val={props.channels[props.channel + '_range_from']}
                    parent={props.parent || ''}
                    onChange={props.onChange}
                /> :
                    <div>
                        <InputText
                            type="number"
                            id={props.channel + '_impressions'}
                            val={props.channels[props.channel] ? props.channels[props.channel].impressions : null}
                            parent={props.parent || ''}
                            onChange={props.onChange}
                        />
                        <InputText
                            id={props.channel + '_link'}
                            label="Link to my page"
                            active
                            val={props.channels[props.channel] ? props.channels[props.channel].link : null}
                            parent={props.parent || ''}
                            onChange={props.onChange}
                        />
                    </div>}
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
