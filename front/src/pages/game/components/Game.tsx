import CardDetail from "../../../core/components/card-detail/CardDetail";
import CardShort from "../../../core/components/card-short/CardShort";
import React from "react";

export function Game(){
    const actionpoints = 100;
    return (
        <div className="ui segment">
            <div className="ui grid">
                <div className="sixteen wide column">
                    <div className="row">
                        <div className="ui grid">
                            <div className="two wide column">
                                <div className="ui one  column centered grid">
                                    <div className="row">
                                        <div className="column"> <i className="user circle huge icon "></i></div>
                                    </div>
                                    <div className="row">
                                        <div className=" column">Eric Smith</div>
                                    </div>

                                    <div className="row">
                                        <div className="column">
                                            <div className="ui teal progress" data-percent={actionpoints} id="progressBarId1" >
                                                <div className="bar"></div>
                                                <div className="label">Action Points</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ten wide column">
                                <div className="ui four column grid">
                                    <div className="column">
                                        <CardShort id={1} name={""} description={""} price={3} hp={10} energy={40} defense={4} attack={5} img_src={""}/>
                                    </div>
                                    <div className="column">
                                        <CardShort id={1} name={""} description={""} price={3} hp={10} energy={40} defense={4} attack={5} img_src={""}/>
                                    </div>
                                    <div className="column">
                                        <CardShort id={1} name={""} description={""} price={3} hp={10} energy={40} defense={4} attack={5} img_src={""}/>
                                    </div>
                                    <div className="column">
                                        <CardShort id={1} name={""} description={""} price={3} hp={10} energy={40} defense={4} attack={5} img_src={""}/>
                                    </div>
                                </div>
                            </div>
                            <div className="four wide column">
                                    <CardDetail id={1} name={""} description={""} price={3} hp={10} energy={40} defense={4} attack={5} img_src={""}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="ui grid ">
                            <div className="twelve wide column">
                                <h4 className="ui horizontal divider header">
                                    VS
                                </h4>
                            </div>
                            <div className="four wide column">
                                <button className="huge ui primary button">
                                    Attack
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="ui grid">
                            <div className="two wide column">
                                <div className="ui one  column centered grid">
                                    <div className="row">
                                        <div className="column">
                                            <div className="ui teal progress" data-percent="20" id="progressBarId2" >
                                                <div className="label">Action Points</div>
                                                <div className="bar"></div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className=" column">Me</div>
                                    </div>
                                    <div className="row">
                                        <div className="column"> <i className="user circle huge icon "></i></div>
                                    </div>

                                </div>
                            </div>
                            <div className="ten wide column">
                                <div className="ui four column grid">
                                    <div className="column">
                                        <CardShort id={1} name={""} description={""} price={3} hp={10} energy={40} defense={4} attack={5} img_src={""}/>
                                    </div>
                                    <div className="column">
                                        <CardShort id={1} name={""} description={""} price={3} hp={10} energy={40} defense={4} attack={5} img_src={""}/>
                                    </div>
                                    <div className="column">
                                        <CardShort id={1} name={""} description={""} price={3} hp={10} energy={40} defense={4} attack={5} img_src={""}/>
                                    </div>
                                    <div className="column">
                                        <CardShort id={1} name={""} description={""} price={3} hp={10} energy={40} defense={4} attack={5} img_src={""}/>
                                    </div>
                                </div>
                            </div>
                            <div className="four wide column">
                                <CardDetail id={1} name={""} description={""} price={3} hp={10} energy={40} defense={4} attack={5} img_src={""}/>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </div>

    )
}