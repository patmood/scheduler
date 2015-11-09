--
-- PostgreSQL database dump
--

CREATE TABLE journal_entries (
    ts timestamp without time zone PRIMARY KEY,
    type text NOT NULL,
    facts text NOT NULL
);
