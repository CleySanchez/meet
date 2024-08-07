// src/components/Alert.js
import React from 'react';
import PropTypes from 'prop-types';

export const InfoAlert = ({ text }) => <div className="alert info-alert">{text}</div>;
export const ErrorAlert = ({ text }) => <div className="alert error-alert">{text}</div>;
export const WarningAlert = ({ text }) => <div className="alert warning-alert">{text}</div>;

InfoAlert.propTypes = {
  text: PropTypes.string.isRequired,
};

ErrorAlert.propTypes = {
  text: PropTypes.string.isRequired,
};

WarningAlert.propTypes = {
  text: PropTypes.string.isRequired,
};
