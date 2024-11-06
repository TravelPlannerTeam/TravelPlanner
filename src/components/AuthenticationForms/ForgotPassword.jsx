import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import "./forms.css";
import logo from "../../assets/logo.png";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirecting after successful reset

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <div className="page">
      <img className="logo" src={logo} alt="travelplanner logo" />
      <Card className="form-card">
        <Card.Body>
          <h2 className="text-center mb-4">Reset Your Password 🔑</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control className="field" type="email" ref={emailRef} required />
            </Form.Group>
            <Button
              disabled={loading}
              type="submit"
              variant="filled"
              color="yellow"
              size="md"
              radius="md"
              fullWidth
            >
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login" className="form-link">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup" className="form-link">Sign Up</Link>
      </div>
    </div>
  );
}
