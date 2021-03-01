import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {

    state = {emotionList: []}

    componentDidMount() {
        let emotions = [];
        this.props.emotions.map(e => {
            return Object.entries(e.emotion).map(e1 => {
                let emotion = e1[0];
                let confidence = e1[1];

                if (emotion in emotions) {
                    emotions[emotion] += confidence / this.props.emotions.length;
                }
                else {
                    emotions[emotion] = confidence / this.props.emotions.length;
                }
                return emotions;
            });
        });
        this.setState({emotionList:Object.entries(emotions).map((e) => {
            return <tr><td>{e[0]}</td><td>{e[1].toFixed(6)}</td></tr>
        })});
    }

    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
                { this.state.emotionList }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
