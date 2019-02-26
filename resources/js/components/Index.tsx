import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {Link} from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {brownPaper} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';

type User = {
    name: string;
}

type Query = {
    id: number;
    name: string;
    query: string;
    user: User;
    updated_at: string;
}

type matchParams = {
}

interface Props extends RouteComponentProps<matchParams> {
}

type State = {
    queries: Query[];
}

export default class Index extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            queries: undefined,
        };

        this.renderQueries = this.renderQueries.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    renderQueries() {
        if (!this.state.queries.length) {
            return <p>There are no queries.</p>
        } else {
            const queries = this.state.queries.map((query) => (
                <tr key={query.id}>
                    <td className="text-nowrap pr-2">{query.name}</td>
                    <td className="w-100 pr-2 query">
                        <SyntaxHighlighter
                            language="sql"
                            style={brownPaper}>
                            {query.query}
                        </SyntaxHighlighter>
                    </td>
                    <td className="text-nowrap pr-2">{query.user.name}</td>
                    <td className="text-nowrap pr-2">{query.updated_at}</td>
                    <td className="text-nowrap">
                        <Link
                            to={`/${query.id}/edit`}
                            className="btn btn-xs btn-outline-secondary mr-1"
                        >
                            Edit
                        </Link>
                        <Link
                            to={`/${query.id}/execute`}
                            className="btn btn-xs btn-outline-secondary mr-1"
                        >
                            Execute
                        </Link>
                        <Link
                            to='#'
                            className="btn btn-xs btn-outline-secondary"
                            onClick={() => this.handleDelete(query.id)}
                        >
                            Delete
                        </Link>
                    </td>
                </tr>
            ));

            return (
                <table className="table table-sm table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Query</th>
                        <th>User</th>
                        <th>Last updated</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {queries}
                    </tbody>
                </table>
            )
        }
    }

    getQueries() {
        axios.get('/queries').then(response =>
            this.setState({
                queries: [...response.data.queries]
            })
        );
    }

    componentWillMount() {
        this.getQueries();
    }

    handleDelete(id) {
        const isNotId = query => query.id !== id;
        const updatedQueries = this.state.queries.filter(isNotId);
        this.setState({queries: updatedQueries});

        axios.delete(`/queries/${id}`);
    }

    render() {
        if (typeof this.state.queries == "undefined") return <div/>;

        return (
            <div>
                <div className="row">
                    <div className="col">
                        <h1>Queries</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col pb-2">
                        <Link className="btn btn-primary float-right" to="/add">
                            Add Query
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.renderQueries()}
                    </div>
                </div>
            </div>
        );
    }
}
