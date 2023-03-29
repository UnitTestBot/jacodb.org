import * as React from 'react';

import withLayout from '../withLayout';
import classNames from "classnames";


export default withLayout(
    class HomePage extends React.Component {
        render() {
            return (
                <main id="rb-docs-content">
                    <div className={'mb-4'}>
                        <div className={classNames('styled-content')}>
                            <h1>
                                Page not found
                            </h1>
                        </div>
                    </div>
                </main>
            );
        }
    },
);
