import '../../assets/css/TextBox.css'
import {connect} from "react-redux";
import {act} from "../../store/Store";
import GamePlay from "../../core/GamePlay";
import {useEffect, useState} from "react";
import DynamicEffectUtil from "../../utils/DynamicEffectUtil";
import {uiActions} from "../../store/UiStore";

const mapStateToProps = state => {
    return {
        display: state.uiState.textBox,
        showName: state.runtime.showName,
        showText: state.runtime.showText,
        playSpeed: state.settings.playSpeed,
        fontSize: state.settings.fontSize
    }
}

function TextBox(props) {
    const [textAnimateInterval, setTextAnimateInterval] = useState()

    const playSpeedMap = {
        slow: 75,
        medium: 50,
        fast: 30
    }

    const fontSizeMap = {
        small: '16px',
        medium: '24px',
        large: '32px'
    }

    useEffect(() => {
        if (textAnimateInterval !== null) clearInterval(textAnimateInterval)

        setTextAnimateInterval(
            DynamicEffectUtil.showTextArray(
                props.showText,
                document.getElementById("SceneText"),
                playSpeedMap[props.playSpeed]
            )
        )
    }, [props.showText])

    function hideTextBox() {
        act(uiActions.SET_TEXT_BOX, false)
    }

    function showBacklog() {
        act(uiActions.SET_BACKLOG_SCREEN, true)
    }

    function nextSentenceProcessor() {
        GamePlay.nextSentenceProcessor()
    }

    function playVocal() {

    }

    function autoNext() {

    }

    function fastNext() {

    }

    function ToSaveScreen() {
        act(uiActions.SET_SAVE_SCREEN, true)
    }

    function ToLoadScreen() {
        act(uiActions.SET_LOAD_SCREEN, true)
    }

    function ToSettingsScreen() {
        act(uiActions.SET_SETTINGS_SCREEN, true)
    }

    function ToTitleScreen() {
        act(uiActions.SET_TITLE_SCREEN, true)
        act(uiActions.SET_TEXT_BOX, false)
    }

    return (
        <div id="bottomBox" style={{'display': props.display ? 'flex' : 'none'}}>
            <div id="top_control">
                <span className="top_button" onClick={hideTextBox}>隐藏</span>
                <span className="top_button" onClick={showBacklog}>回溯</span>
            </div>
            <div id="mainTextWindow" onClick={nextSentenceProcessor}>
                <div id="pName">
                    <span>{props.showName}</span>
                </div>
                <div id="SceneText" style={{fontSize: fontSizeMap[props.fontSize]}}/>
            </div>
            <div id="controlBar">
                <div className="controlButton" onClick={playVocal}>重播</div>
                <div className="controlButton" onClick={autoNext} id="autoButton">自动</div>
                <div className="controlButton" onClick={fastNext} id="fastButton">快进</div>
                <div className="controlButton" onClick={ToSaveScreen} id="saveButton">存档</div>
                <div className="controlButton" onClick={ToLoadScreen} id="loadButton">读档</div>
                <div className="controlButton" onClick={ToSettingsScreen}>设置</div>
                <div className="controlButton" onClick={ToTitleScreen} id="titleButton">标题</div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(TextBox)