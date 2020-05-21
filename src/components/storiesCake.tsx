import React, { Component } from "react";
import "./styles/stories.scss";
import Story from "./story";
import { storyType } from "./types";
import $ from "jquery";
import { connect } from "react-redux";
import { seeStory, addStories } from "./store/actions/story";

interface stateType {
  stories: Array<storyType>;
  story: storyType;
}

const initalState: storyType = {
  url: "",
  text: {
    valueText: "",
    styleText: {
      color: "",
      background: "",
    },
  },
};

interface Props {
  dispatch: any;
  state: {
    story: storyType;
    stories: Array<storyType>;
  };
}

class StoriesDoces extends Component<Props, {}> {
  state: stateType = {
    stories: [
      {
        url: "/images/story.jpg",
        text: {
          valueText: "Hello Angola get The New Virtual Store OF cAKE",
          styleText: {
            color: "blue",
            background: "white",
          },
        },
      },
      {
        url: "/images/shot-cropped-1558159069082.png",
        text: {
          valueText: "Hello Angola get The New Virtual Store OF cAKE",
          styleText: {
            color: "blue",
            background: "white",
          },
        },
      },
      {
        url: "/images/man.jpg",
        text: {
          valueText: "Hello Angola get The New Virtual Store OF cAKE",
          styleText: {
            color: "blue",
            background: "red",
          },
        },
      },
    ],
    story: initalState,
  };

  putStyleImg = (img: string) => {
    return {
      background: `url(${img})`,
    };
  };

  showStory = (story: storyType, index: number) => {
    this.setState({ story });
    this.props.dispatch(seeStory({ ...story, indexA: index }));
     $(".overlayStory").fadeIn();
  };

  componentDidMount() {
    this.props.dispatch(addStories(this.state.stories));
  }

  render() {
    return (
      <div className="Stories">

        <Story />

        <h1 className="titl_stories">Stories</h1>
        <ul className="list_stories">
          {this.state.stories.map((st: storyType, key) => (
            <div
              className="story"
              onClick={() => this.showStory(st, key)}
              key={key}
            >
              <div className="overStory"></div>
              <div
                className="img_list_story"
                style={this.putStyleImg(st.url)}
              ></div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({ state });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(StoriesDoces);
