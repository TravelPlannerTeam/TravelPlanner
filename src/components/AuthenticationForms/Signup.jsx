import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import "./forms.css";
import logo from "../../assets/logo.png";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/"); 
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="page">
      <img className="logo" src={logo} alt="travelplanner logo" />
      <Card className="form-card">
        <Card.Body>
          <h2 className="text-center mb-4">Sign up to TravelPlanner 💛</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control className="field" type="password" ref={passwordConfirmRef} required />
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
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login" className="form-link">Log In</Link>
      </div>
    </div>
  );
}
