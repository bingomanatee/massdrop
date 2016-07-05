import React from "react";
import styles from "./style.css";
import Job from './../../common/components/Job';

const now = () => Math.round(new Date().getTime() / 1000);
const inputStyle = {
    width: '10rem',
    outline: 'none'
};

export default class HomePage extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            rows: [{
                _id: ' ', url: 'loading...'
            }],
            refreshTime: 5,
            lastUpdated: 0,
            now: now()
        };

        this.loadRows();

        this._update = setInterval(this.updateTime.bind(this), 500);
    }

    loadRows () {
        console.log('getting api rows');
        $.get('http://localhost:3001/api')
            .done(rows => {
                const lastUpdated = now();
                this.setState({rows, lastUpdated});
            })
            .fail(err => {
                console.log('fail: ', err);
            });
    }

    updateTime () {
        const n = now();
        if (n != this.state.now) {
            if (n - this.state.lastUpdated > this.state.refreshTime) {
                this.loadRows();
            }
            this.setState({now: now()});
        }
    }

    setRefreshTime (event) {
        this.setState({refreshTime: event.target.value});
    }

    render () {
        const rows = this.state.rows.sort((a, b) => b.created_unixtime - a.created_unixtime).map((job, i) => <Job key={`row-${i}`}job={job}/>);
        const refresh = this.setRefreshTime.bind(this);
        return (
            <div className={styles.content}>
                <h1><a href="/">Massdrop</a>: Work Queue</h1>
                <p>Jobs in Process: refreshes every <input type="number" value={this.state.refreshTime} style={inputStyle}
                                                           min="1" max="60" onChange={refresh}/> seconds</p>

                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>Url</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}
