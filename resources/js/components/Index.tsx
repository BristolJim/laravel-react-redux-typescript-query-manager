import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {brownPaper} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Chart from 'react-google-charts';

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
    num_rows?: number;
    num_columns?: number;
}

type matchParams = {}

interface Props extends RouteComponentProps<matchParams> {
}

type State = {
    queries: Query[];
    hasResults: boolean;
}

export default class Index extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            queries: undefined,
            hasResults: undefined,
        };

        this.renderQueries = this.renderQueries.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.showChart = this.showChart.bind(this);
        this.renderChart = this.renderChart.bind(this);
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

    getQueries(withResults = false) {
        axios.get('/queries?withResults=' + withResults).then(response =>
            this.setState({
                queries: response.data.queries,
                hasResults: withResults,
            })
        );
    }

    componentWillMount() {
        this.getQueries(false);
    }

    handleDelete(id) {
        const isNotId = query => query.id !== id;
        const updatedQueries = this.state.queries.filter(isNotId);

        this.setState({queries: updatedQueries});

        axios.delete(`/queries/${id}`);
    }

    showChart() {
        this.getQueries(true);
    }

    renderChart() {
        if (!this.state.queries.length) {
            return <div/>;
        }

        if (!this.state.hasResults) {
            return <div/>;
        }

        let chartData = [];
        let chartRowsData = [];

        this.state.queries.forEach(function (query) {
            if (query.error) {

            } else if (!query.result.length) {

            } else {
                chartData.push([
                    query.name,
                    Object.keys(query.result[0]).length,
                    query.result.length,
                ]);

                chartRowsData.push([
                    query.name,
                    query.result.length,
                ]);
            }
        });

        chartData = [['Query name', 'Number of columns', 'Number of rows'], ...chartData];
        chartRowsData = [['Query name', 'Number of rows'], ...chartRowsData];

        return <div className="row charts align-contents-between">
            <div className="col col-7 col-bar">
                <div>
                    <Chart
                        chartType={"BarChart"}
                        data={chartData}
                        width={"100%"}
                        height={"350px"}
                        options={{
                            title: 'Number or rows and columns for each query',
                            chartArea: {
                                width: "50%",
                            },
                            hAxis: {
                                title: "Columns / Rows",
                                minValue: 0,
                            },
                            vAxis: {
                                title: "Queries",
                            },
                        }}
                    />
                </div>
            </div>
            <div className="col col-5 col-pie">
                <div>
                    <Chart
                        chartType={"PieChart"}
                        data={chartRowsData}
                        width={"100%"}
                        height={"350px"}
                        options={{
                            title: "Number of rows returned by each query",
                            chartArea: {width: "90%"},
                            pieHole: 0.4,
                            is3D: false,
                        }}
                    />
                </div>
            </div>
        </div>

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
                <div className="row">
                    <div className="col pb-4">
                        <button onClick={this.showChart} className="btn btn-primary">
                            Generate Charts
                        </button>
                    </div>
                </div>
                {this.renderChart()}
            </div>
        );
    }
}
