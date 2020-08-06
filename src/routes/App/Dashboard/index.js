import React, { useEffect, useState, useRef, Fragment } from "react";
import longQuery from "../../../utils/apolo-client";
import { useQuery } from "@apollo/client";
import { QueryMulti, QuerySingle } from "../../../utils/queries";
import Card from "../../../components/Card/Card";
import Config from "../../../utils/config";
import Tree from "react-animated-tree";
import { Controlled as CodeMirror } from "react-codemirror2";
import "../../../../node_modules/codemirror/lib/codemirror.css";
import "../../../../node_modules/codemirror/mode/htmlmixed/htmlmixed";
import DropdownButton from "../../../components/Button/DropdownButton";
import DropdownItem from "../../../components/Button/DropdownItem";
import Utils from "../../../utils/utils";
import command from "../../../utils/command";
// require('codemirror/mode/htmlmixed')

const querySingle = new QuerySingle(
    "article",
    "0e694889-b854-a337-dc9e-5e3d547ac2e1"
);

const querySingle2 = new QuerySingle("merchant", Config.merchantId, {}, [
    "id",
    `
    components {
      id,
      name,
      description,
      subDescription,
      type,
      displayOrder,
      parentId,
      published
    }
    `,
]);

const getSectionTree = (sectionsQuery) => {
    const section = {};
    const allSections = sectionsQuery.data.merchant.components;
    // find root
    allSections.forEach((component) => {
        if (!section[component.parentId]) {
            section[component.parentId] = {
                name: "",
                sections: [component],
            };
        } else section[component.parentId].sections.push(component);
    });
    Object.keys(section).forEach((s) => {
        const findedSection = allSections.find((val) => val.id === s);
        if (findedSection) {
            section[s].name = findedSection.name;
        } else section[s].name = "ROOT";
    });
    const root = section[Config.guidEmpty];
    const sectionTree = {};
    root.sections.forEach((val) => {
        sectionTree[val.id] = {
            ...val,
            sections: section[val.id] ? section[val.id].sections : [],
        };
    });
    return sectionTree;
};

function Dashboard(props) {
    const sectionsQuery = useQuery(querySingle2.getQuerySingle());

    const [sectionTree, setSectionTree] = useState({});
    const [sectionInfo, setSectionInfo] = useState(null);

    const [action, setAction] = useState(null);

    useEffect(() => {
        if (sectionsQuery.data) {
            const sectionTree = getSectionTree(sectionsQuery);
            console.log(sectionTree);
            setSectionTree(sectionTree);
        }
        return () => {};
    }, [sectionsQuery.data]);

    function onSave(e, sectionInfo) {
        e.preventDefault();
        switch (action) {
            case "add":
                const bodyAdd = {
                    Id: sectionInfo.id,
                    Name: sectionInfo.name,
                    ParentId: sectionInfo.parentId,
                    ThemeWebId: Config.themeWebId,
                    Description: sectionInfo.description,
                    DisplayOrder: 10,
                    LanguageId: Config.languageId,
                    CreatedDate: new Date(),
                    CreatedBy: Config.userId,
                    MerchantId: Config.merchantId,
                };
                command
                    .sendCommand("category", "CreateComponentCategory", bodyAdd)
                    .then((res) => alert(JSON.stringify(res.data)))
                    .then(() => {
                        sectionsQuery.refetch();
                    });
                break;
            case "edit":
                const bodyEdit = {
                    Id: sectionInfo.id,
                    Name: sectionInfo.name,
                    Description: sectionInfo.description,
                    LanguageId: Config.languageId,
                    ModifiedDate: new Date(),
                    ModifiedBy: Config.userId,
                };
                command
                    .sendCommand(
                        "category",
                        "UpdateComponentCategory",
                        bodyEdit
                    )
                    .then((res) => alert(JSON.stringify(res.data)))
                    .then(() => {
                        sectionsQuery.refetch();
                    });

            default:
                break;
        }
    }

    const onAddSection = (parentId) => {
        setAction("add");
        const sectionInfo = {
            id: Utils.guid(),
            description: "",
            parentId: parentId,
            name: "",
        };
        setSectionInfo(sectionInfo);
    };

    const onDeleteSection = async (section) => {
        let sure = window.confirm("Bạn có chắc chẳn muốn xóa!");

        if (sure) {
            const body = {
                Id: section.id,
                ModifiedBy: Config.userId,
                ModifiedDate: new Date(),
            };
            const res = await command.sendCommand(
                "category",
                "DeleteCategory",
                body
            );
            alert(JSON.stringify(res.data));
            sectionsQuery.refetch();
        }
    };

    const pickSectionHandler = (section) => {
        setSectionInfo(section);
    };

    if (sectionsQuery.loading) return <p>Loading...</p>;
    if (sectionsQuery.error)
        return <p>Error :( {JSON.stringify(sectionsQuery.error)}</p>;

    return (
        <div>
            <Card statistic>
                <div className="row">
                    <div className="col-md-3">
                        {Object.keys(sectionTree).map((key, i) => (
                            <Tree
                                key={i}
                                type={
                                    <span
                                        style={{
                                            fontSize: "2em",
                                            verticalAlign: "middle",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            onDeleteSection(sectionTree[key])
                                        }
                                    >
                                        🗑️
                                    </span>
                                }
                                content={sectionTree[key].name}
                                visible
                            >
                                {sectionTree[key].sections.map((s) => (
                                    <Tree
                                        key={s.id}
                                        canHide
                                        type={
                                            <span
                                                style={{
                                                    fontSize: "2em",
                                                    verticalAlign: "middle",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    onDeleteSection(s)
                                                }
                                            >
                                                ❌
                                            </span>
                                        }
                                        visible={false}
                                        content={s.name}
                                        onClick={(show) => {
                                            if (show) {
                                                pickSectionHandler(s);
                                                setAction("edit");
                                            } else {
                                                pickSectionHandler(null);
                                                setAction(null);
                                            }
                                        }}
                                    />
                                ))}
                                <Tree
                                    type={
                                        <span
                                            style={{
                                                fontSize: "2em",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => onAddSection(key)}
                                        >
                                            ➕
                                        </span>
                                    }
                                    content="Thêm khối"
                                />
                            </Tree>
                        ))}
                        <Tree
                            type={
                                <span
                                    style={{
                                        fontSize: "2em",
                                        verticalAlign: "middle",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        onAddSection(Config.guidEmpty)
                                    }
                                >
                                    ➕
                                </span>
                            }
                            content="Thêm khối"
                        />
                    </div>
                    <div className="col-md-9">
                        {/* {action ? (
                        ) : null} */}
                        {action ? (
                            <div className="d-flex">
                                <h4 className="d-inline-block">
                                    <strong>Hành động: </strong>
                                    <span class="badge badge-secondary">
                                        {action}
                                    </span>
                                </h4>
                                <DropdownButton
                                    className="mb-2 ml-auto w-fit-content"
                                    title="Actions"
                                    color="primary"
                                >
                                    <DropdownItem
                                        href="#"
                                        onClick={(e) => onSave(e, sectionInfo)}
                                    >
                                        Save
                                    </DropdownItem>
                                </DropdownButton>
                            </div>
                        ) : null}
                        {/* <Card statistic> */}
                        {sectionInfo || action ? (
                            <Fragment>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        className="form-control"
                                        value={sectionInfo.name}
                                        onChange={(e) =>
                                            setSectionInfo({
                                                ...sectionInfo,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div
                                    style={{
                                        border: "1px solid #f5f2f0",
                                        height: "100%",
                                    }}
                                >
                                    <CodeMirror
                                        value={sectionInfo.description}
                                        options={{
                                            mode: "text/html",
                                            lineNumbers: true,
                                        }}
                                        onBeforeChange={(
                                            editor,
                                            data,
                                            value
                                        ) => {
                                            setSectionInfo({
                                                ...sectionInfo,
                                                description: value,
                                            });
                                        }}
                                        onChange={(editor, data, value) => {}}
                                    />
                                </div>
                            </Fragment>
                        ) : (
                            <p className="text-center">
                                <i>Vui lòng chọn khối</i>
                            </p>
                        )}
                        {/* {JSON.stringify(section)} */}
                        {/* {sectionsQuery.data.merchant.components.filter(item => item.parentId === "ca744958-6444-455b-b26a-ec5e2427b8bd").map((item) => (
                            <p key={item.id}>{item.parentId} - {item.name}</p>
                        ))} */}
                        {/* </Card> */}
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Dashboard;
