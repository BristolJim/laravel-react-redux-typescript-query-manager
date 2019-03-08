import {connect} from 'react-redux';
import {fetchQueries, fetchQueriesSuccess, fetchQueriesFailure} from '../actions/';
import QueriesList from '../components/Queries';

const mapStateToProps = (state) => {
    console.log("mapStateToProps");
    return {
        queriesList: state.queries.queriesList
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchQueries: () => {
        dispatch(fetchQueries());
        return fetch('/queries?withResults=0')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                dispatch(fetchQueriesSuccess(json.queries))
            })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QueriesList);
