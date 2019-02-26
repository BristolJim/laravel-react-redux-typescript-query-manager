import * as React from 'react';
import {RouteComponentProps} from 'react-router';
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
    id: string;
}

interface Props extends RouteComponentProps<matchParams> {
}

type State = {
    edit: boolean;
    query: Query;
}

export default class QueryEdit extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        const edit = !!this.props.match.params.id;

        this.state = {
            edit: edit,
            query: edit ? undefined : {
                id: null,
                name: '',
                query: '',
                user: {
                    name: ''
                },
                updated_at: '',
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const query = this.state.query;
        query[e.target.id] = e.target.value;

        this.setState({
            query: query
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let req;

        if (this.state.edit) {
            req = {
                url: `/queries/${this.props.match.params.id}`,
                method: 'PUT',
            }
        } else {
            req = {
                url: `/queries/`,
                method: 'POST',
            }
        }

        req.data = this.state.query;

        axios(req).then(() => {
            this.props.history.push('/home');
        });

    }

    getQuery() {
        axios
            .get(`/queries/${this.props.match.params.id}/edit`)
            .then(response =>
                this.setState({
                    query: response.data.query,
                })
            );
    }

    componentWillMount() {
        if (this.state.edit) {
            this.getQuery();
        }
    }

    render() {
        if (this.state.edit && typeof this.state.query == "undefined") return <div/>;

        return (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">New Query</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        onChange={this.handleChange}
                                        value={this.state.query.name}
                                        className="form-control"
                                        placeholder="Query name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="query">SQL</label>
                                    <textarea
                                        id="query"
                                        onChange={this.handleChange}
                                        value={this.state.query.query}
                                        className="form-control text-monospace"
                                        placeholder="SQL"
//                                        rows="10"
//                                        maxLength="255"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Save Query
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
