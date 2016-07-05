import React from 'react';
import moment from 'moment';

const cleanDate = (number) => !number ? '??' : moment(parseInt(number) * 1000).format("ddd, MMM DD YY, h:mm a");

export default (props) => (
    <tr>
        <td>{props.job._id || '??' }</td>
        <td>{props.job.url || '??'}</td>
        <td>{cleanDate(props.job.created_unixtime)}</td>
        <td>{cleanDate(props.job.updated_unixtime)}</td>
        <td>{props.job.status || '??'}</td>
    </tr>
);
