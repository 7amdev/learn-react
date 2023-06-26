import React from "react";

const List = function ({ records }) {

    return (
        <ul>
            {
                records.map(function (record) {
                    return (
                        <li key={ record.id }>
                            <h3>{ record.name }</h3>
                            <h4>{ record.artist_name }</h4>
                            <p>{ record.description }</p>
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default List;