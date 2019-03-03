import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import axios from 'axios';
import {Link} from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {brownPaper} from 'react-syntax-highlighter/dist/esm/styles/hljs';

type User = {
    name: string;
}

type Query = {
    id: number;
    name: string;
    query: string;
    user: User;
    updated_at: string;
    result: object[];
    error: string;
}

type matchParams = {
    id: string;
}

interface Props extends RouteComponentProps<matchParams> {
}

type State = {
    query: Query;
}

export default class QueryExecute extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            query: undefined,
        };

        this.renderResult = this.renderResult.bind(this);
    }

    executeQuery() {
        axios
            .get(`/queries/${this.props.match.params.id}/execute`)
            .then(response => {
                response.data.query.error = response.data.error;
                response.data.query.result = response.data.result;
                this.setState({
                    query: response.data.query,
                })}
            );
    }

    renderResult() {
        const query = this.state.query;

        if (query.error) {
            return (
                <p><strong>ERROR:</strong> {query.error}</p>
            );
        }

        if (!query.result.length) {
            return (
                <p>No rows to display.</p>
            );
        }

        let columnNames = Object.keys(query.result[0]);

        const tableHead = columnNames.map((columnName, i) => (
            <th key={"th-" + i} className="pr-2">{columnName}</th>
        ));

        const tableBody = query.result.map((row, i) => (
            <tr key={"tr-" + i}>
                {columnNames.map((columnName, j) => (
                    <td key={"td-" + i + "-" + j} className="pr-2">{row[columnName]}</td>
                ))}
            </tr>
        ));

        return (
            <table className="table table-sm table-striped">
                <thead><tr>{tableHead}</tr></thead>
                <tbody>{tableBody}</tbody>
            </table>
        )
    }

    componentWillMount() {
        this.executeQuery();
    }

    render() {
        if (typeof this.state.query == "undefined") return <div />;

        return (
            <div>
                <div className="row">
                    <div className="col">
                        <h1>Query: {this.state.query.name}</h1>
                        <div className="row">
                            <div className="col query">
                                <SyntaxHighlighter
                                    language="sql"
                                    style={brownPaper}>
                                    {this.state.query.query}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h2>Result</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {this.renderResult()}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col pb-2">
                                <Link className="btn btn-primary" to="/home">
                                    Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
