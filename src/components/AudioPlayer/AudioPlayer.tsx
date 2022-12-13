import { Button } from "@chakra-ui/button";
import classNames from "classnames";
import { Component } from "react";
import ReactDOM from "react-dom";
import { FaPause, FaPlay } from "react-icons/fa";
import WaveSurfer from "wavesurfer.js";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import cursorConfig from "./config/cursorConfig";
import waveConfig from "./config/waveConfig";
import styles from "./index.module.css";

type Props = {
  blobToPlay: any;
  onCut: Function;
  secondsPlay: number;
  isEdit?: boolean;
};
type State = {
  /** Is the song currently playing. */
  isPlaying: boolean;
  /** * Start time of the region to cut. */
  cutStart: number;
  /** Original start time of the region (used when user presses 'Cancel'). */
  originalCutStart: number;
  /** End time of the region to cut. */
  cutEnd: number;
  /** Original end time of the region (used when user presses 'Cancel'). */
  originalCutEnd: number;
  /** Should the song be cut with a fade in. */
  addFadeIn: boolean;
  /** Should the song be cut with a fade out. */
  addFadeOut: boolean;
  /** The main library for displaying the audio wave. */
  waveSurfer?: WaveSurfer;
  /** Marks whether the regions were moved. */
  wasRegionChanged: boolean;
};

export default class AudioPlayer extends Component<Props, State> {
  private readonly WAVEFORM_CONTAINER: string = "waveform";
  private readonly REGION_COLOR: string = "rgba(0, 123, 255, 0.48)";

  state: State = {
    isPlaying: false,
    originalCutStart: NaN,
    originalCutEnd: NaN,
    cutStart: NaN,
    cutEnd: NaN,
    addFadeIn: false,
    addFadeOut: false,
    wasRegionChanged: false,
  };

  /** Generate and show the audio wave. */
  componentDidMount() {
    const { blobToPlay, isEdit = false } = this.props;

    // Get the specific DOM element for storing the wave visualization
    const componentDiv = ReactDOM.findDOMNode(this) as HTMLElement;
    const waveformDiv = componentDiv.getElementsByClassName(
      "waveform"
    )[0] as HTMLElement;

    const waveSurfer = WaveSurfer.create({
      // Get the specific DOM element for storing the wave visualization
      container: waveformDiv,
      ...waveConfig,
      plugins: [
        // Add a vertical cursor on the wave form when the mouse hovers over it
        CursorPlugin.create({ ...cursorConfig }),
        // Initialize the plugin that adds a dragable region over the waveform
        RegionsPlugin.create(),
      ],
    });
    waveSurfer.on("ready", () => this.onWaveSurferReady(waveSurfer));
    waveSurfer.on("finish", () => this.onSongFinishedPlaying());
    isEdit ? waveSurfer.load(blobToPlay) : waveSurfer.loadBlob(blobToPlay);
  }

  componentWillUnmount = () => {
    const { waveSurfer } = this.state;
    if (!waveSurfer) return;

    waveSurfer.destroy();
  };

  componentDidUpdate = (preProps: any, preState: any) => {
    if (preProps.secondsPlay !== this.props.secondsPlay) {
      const { waveSurfer } = this.state;
      const newRegion = this.recreateRegion(
        waveSurfer as any,
        0,
        this.props.secondsPlay
      );

      if (this.state.isPlaying) {
        newRegion.play();
      }
      this.props.onCut(0, this.props.secondsPlay);
    }
  };

  /**
   * Start listening to region events.
   * Draw the region itself.
   */
  onWaveSurferReady = (waveSurfer: WaveSurfer) => {
    waveSurfer.on("region-created", this.onCropRegionCreated);
    waveSurfer.on("region-updated", this.onCropRegionUpdated);
    waveSurfer.on("region-update-end", this.onCropRegionUpdateEnd);

    let cutStart: number;
    let cutEnd: number;
    const duration = waveSurfer.getDuration();

    if (duration > 40) {
      cutStart = 20;
      cutEnd = duration - 20;
    } else {
      cutStart = 0;
      cutEnd = duration;
    }

    this.setState({
      waveSurfer,
      cutStart,
      cutEnd,
      originalCutStart: cutStart,
      originalCutEnd: cutEnd,
    });
  };

  onCropRegionCreated = (params: any) => {
    // Remove region's 'title' attribute showing the region's duration.
    params.element.attributes.title.value = "";
  };

  /**
   * Called when the draggable area has been moved.
   * Recreate region if starting end overlaps the ending.
   */
  onCropRegionUpdated = (params: any) => {
    const { start, end } = params;
    const { cutStart, cutEnd, waveSurfer, isPlaying } = this.state;

    if (!waveSurfer) return;

    // Remove region's 'title' attribute showing the region's duration.
    params.element.attributes.title.value = "";

    // Check if one end of the region was dragged over the other one
    if (Math.abs(start - end) > 0.25) {
      return;
    }

    // Recreate region from last know valid positions
    const newRegion = this.recreateRegion(waveSurfer, cutStart, cutEnd);

    if (isPlaying) {
      newRegion.play();
    }

    this.setState({
      waveSurfer,
    });
  };

  /**
   * Called when the region has finished moving (drag/expand/shrink).
   */
  onCropRegionUpdateEnd = (params: any) => {
    const regionStart = params.start;
    const regionEnd = params.end;

    const { isPlaying, waveSurfer, cutStart } = this.state;

    if (!waveSurfer) return;

    const region = regionStart !== cutStart ? regionStart : regionEnd;
    if (isPlaying) {
      waveSurfer.play(region);
    }

    this.setState({
      cutStart: regionStart,
      cutEnd: regionEnd,
      wasRegionChanged: true,
    });
    this.props.onCut(regionStart, regionEnd);
  };

  /**
   * Recreate the region to given time stamps.
   * @returns The newly created region.
   */
  recreateRegion = (
    waveSurfer: WaveSurfer,
    startTime: number,
    endTime: number
  ): WaveSurfer => {
    waveSurfer.clearRegions();

    return waveSurfer.addRegion({
      start: startTime,
      end: endTime,
      color: this.REGION_COLOR,
      loop: true,
    });
  };

  onSongFinishedPlaying = () => {
    this.setState({
      isPlaying: false,
    });
  };

  /**
   * Play or pause the audio playback.
   */
  handleClickTogglePlay = () => {
    const { waveSurfer, isPlaying } = this.state;

    if (!waveSurfer) return;

    if (isPlaying) {
      waveSurfer.pause();
    } else {
      waveSurfer.play();
    }

    this.setState({ isPlaying: !isPlaying });
  };

  render() {
    const { waveSurfer, isPlaying } = this.state;
    const isLoading = waveSurfer ? false : true;
    const toggleIcon = isPlaying ? <FaPause /> : <FaPlay />;
    return (
      <div
        className={classNames("row mzt-row-waveform", {
          [styles.mztRowWaveform]: isLoading,
        })}
      >
        <div className="col">
          <div className="row">
            <div className="col">
              <div className={this.WAVEFORM_CONTAINER} />
            </div>
          </div>

          <div className="row justify-content-center">
            <Button onClick={this.handleClickTogglePlay} margin="20px 0">
              {toggleIcon}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
