import React, {useState} from 'react'
import {useLunr} from 'react-lunr'
import lunr from 'lunr'

import index from '../../lunr-index';
import {Form, InputGroup, ListGroup, Modal, NavLink} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Highlight from 'react-highlighter';

import { faSearch } from '@fortawesome/free-solid-svg-icons'


const idx = lunr.Index.load(index.LUNR_DATA);
const previewLookup = index.PREVIEW_LOOKUP;

function parseLunrResults(results, query) {
    return <ListGroup as="ol" numbered>
        {results.map(it => {
            const id = it["ref"];
            const item = previewLookup[id];
            const title = item["t"];
            let preview = item["p"];
            const link = item["l"];
            return (
                <ListGroup.Item key={id} as="li" className="d-flex justify-content-between align-items-start">
                    <NavLink className="ms-2 me-auto" href={"/docs/" + link}>
                        <span className="fw-bold">{title}</span>
                        <br/>
                        <Highlight
                            search={query}
                            matchClass={"found-class"}>
                            {preview}
                        </Highlight>
                    </NavLink>
                </ListGroup.Item>
            )
        })}
    </ListGroup>;
}

const SearchBar = () => {
    const [query, setQuery] = useState(null)
    const results = useLunr(query, idx)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Form>
                <InputGroup>
                    <Button variant="outline-secondary" id="button-addon1"
                            type={"submit"}
                            onClick={(val) => {
                                val.preventDefault();
                                handleShow();
                            }}
                    >
                        <FontAwesomeIcon icon={faSearch}/>
                    </Button>
                    <Form.Control
                        type="text"
                        placeholder="Search docs"
                        name={'query'}
                        onChange={(val) => {
                            setQuery(val.target.value);
                        }}/>
                </InputGroup>
            </Form>
            <Modal show={show}
                   onHide={handleClose}
                   size="lg">
                <Modal.Header closeButton/>
                <Modal.Body>
                    {parseLunrResults(results, query)}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SearchBar;