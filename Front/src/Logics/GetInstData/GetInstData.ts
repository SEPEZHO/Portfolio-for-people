import React from 'react';
import { connect } from 'react-redux';
import { UpdateInstData } from 'src/Store/Actions/UpdateInstDataAction';

const GetInstDataFunc: React.FC = (props) => {
  fetch('https://sepezho.com:8888/API/GetInstData', {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((response) => {
    console.log(response)
    props.UpdateInstData(response)
  })
  .catch((err) => {
    console.log(err);
    // alert("Проблема с сервером :)");
  });
  return null;
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateInstData: (instData) => dispatch(UpdateInstData(instData)),
  };
};

export default connect(null, mapDispatchToProps)(GetInstDataFunc);