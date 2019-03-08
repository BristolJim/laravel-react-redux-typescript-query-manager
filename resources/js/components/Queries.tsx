import * as React from 'react'
import {Link} from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {brownPaper} from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface DispatchProps {
    fetchQueries
}

interface StateProps {
    queriesList
}

type Props = DispatchProps & StateProps;

class QueriesList extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        QueriesList.renderQueries = QueriesList.renderQueries.bind(this);
        QueriesList.handleDelete = QueriesList.handleDelete.bind(this);
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.props.fetchQueries();
    }

    static handleDelete(id) {
        /*
        const isNotId = query => query.id !== id;
        const updatedQueries = this.state.queries.filter(isNotId);

        this.setState({queries: updatedQueries});

        axios.delete(`/queries/${id}`)
        */
    }

    static renderQueries(queries) {
        const q = queries.map((query) => (
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
                {q}
                </tbody>
            </table>
        );

    }

    render() {
        const {queries, loading, error} = this.props.queriesList;

        if (loading) {
            return <div className="container"><h1>Queries</h1><h3>Loading...</h3></div>;
        } else if (error) {
            return <div className="alert alert-danger">Error: {error.message}</div>;
        }

        return (
            <div className="container">
                <h1>Queries</h1>
                <ul className="list-group">
                    {QueriesList.renderQueries(queries)}
                </ul>
            </div>
        );
    }
}

export default QueriesList;