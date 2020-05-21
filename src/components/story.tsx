import React, { Component } from "react";
import "./styles/stories.scss";
import $ from "jquery";
import { storyType } from "./types";
import { connect } from "react-redux";
import { seeStory, closeStory as closeSt } from "./store/actions/story";

interface stType extends storyType {
  indexA: number;
}

interface Props {
  state: {
    story: stType;
    stories: Array<storyType>;
  };
  dispatch: any;
  story: storyType;
}

class Story extends Component<Props, {}> {
  state = {
    keepGoing: true,
    timer: 3000,
  };

  time: any = 0;

  closeStory = async () => {
    $(".overlayStory").fadeOut();
    await this.props.dispatch(closeSt());
    $(".time_counting").removeClass("timePaused");
    //this.setState({ keepGoing: false });
    //this.time = 0;
    // this.isPlay = false;
  };

  closeStoryAlone = () => {
    if (this.state.keepGoing) {
      if (this.props.state.story.indexA >= 0) {
        this.time = setTimeout(() => {
          this.callAnotherStoryIfExist();
        }, this.state.timer);
      }
    }
  };

  callAnotherStoryIfExist = async () => {
    if (this.state.keepGoing) {
      var indexStory = this.props.state.story.indexA;
      var indexStories = this.props.state.stories.length - 1;

      if (indexStories === indexStory) {
        await $(".overlayStory").fadeOut();
        await this.props.dispatch(closeSt());
      } else {
        if (indexStory >= 0) {
          var nextIndexStory = indexStory + 1;
          var nextStory: storyType = this.props.state.stories[nextIndexStory];
          this.props.dispatch(
            seeStory({ ...nextStory, indexA: nextIndexStory })
          );
        }
      }
    }
  };

  isPlay = true;

  pauseAndPlayStory = () => {
    // if (this.isPlay) {
    //   $(".time_counting").addClass("timePaused");
    //   //this.setState({ keepGoing: false });
    //   //this.setState({ timer: false });
    //   this.isPlay = !this.isPlay;
    // } else {
    //   $(".time_counting").removeClass("timePaused");
    //  // this.setState({ keepGoing: true });
    //   this.isPlay = !this.isPlay;
    // }
  };

  playStory = () => {};

  render() {
    const {
      url,
      text: { styleText, valueText },
    } = this.props.state.story;

    const imgbg = () => {
      return {
        background: `linear-gradient(rgba(20, 20, 20, 0.829), rgba(255, 0, 0, 0)),
      url(${url ? url : null})`,
      };
    };

    if (url && this.state.keepGoing) {
      this.closeStoryAlone();
    }

    return (
      <div className="overlayStory">
        <div className="divStoryContent">
          <ul className="list_stories_counter">
            <li>
              <div className="time_counting"></div>
            </li>
          </ul>

          <div className="storyContent">
            <div
              className="img_storie"
              style={imgbg()}
              onClick={this.pauseAndPlayStory}
            >
              <h1
                className="legend"
                style={styleText ? styleText : { color: "none" }}
              >
                {valueText}
              </h1>
            </div>
          </div>
        </div>

        <button className="close_story" onClick={this.closeStory}>
          <img src="images/icons8_multiply_24px.png" alt="" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({ state });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Story);
