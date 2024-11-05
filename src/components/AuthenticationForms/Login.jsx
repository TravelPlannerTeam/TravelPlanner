import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

import { useAuth } from "../../contexts/AuthContext";
import "./forms.css";
import logo from "../../assets/logo.png";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="page">
      <img className="logo" src={logo} alt="travelplanner logo" />
      <Card className="form-card">
        <Card.Body>
          <h2 className="text-center mb-4">Login to TravelPlanner</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control className="field" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control className="field" type="password" ref={passwordRef} required />
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
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password" className="form-link">
              Forgot Password?
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account?{" "}
        <Link to="/signup" className="form-link">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
