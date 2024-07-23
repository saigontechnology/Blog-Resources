import { Composition, staticFile } from 'remotion';
import { AudioGramSchema, AudiogramComposition, fps } from './Composition';
import './style.css';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="Audiogram"
				component={AudiogramComposition}
				fps={fps}
				width={1080}
				height={1920}
				schema={AudioGramSchema}
				defaultProps={{
					// Audio settings
					audioOffsetInSeconds: 0.15,

					// Title settings
					audioFileName: staticFile('audio.mp3'),
					coverImgFileName: staticFile('cover.png'),
					titleText: 'Track 17. Unit 3. Listening. Exercise 3.',
					titleColor: 'rgba(186, 186, 186, 0.93)',

					// Subtitles settings
					subtitlesFileName: staticFile('subtitles.srt'),
					subtitlesViFileName: staticFile('subtitles_vi.srt'),
					onlyDisplayCurrentSentence: true,
					subtitlesTextColor: 'rgba(255, 255, 255, 0.93)',
					subtitlesLinePerPage: 8,
					subtitlesZoomMeasurerSize: 10,
					subtitlesLineHeight: 66,

					// Wave settings
					waveColor: '#a3a5ae',
					waveFreqRangeStartIndex: 7,
					waveLinesToDisplay: 29,
					waveNumberOfSamples: '256', // This is string for Remotion controls and will be converted to a number
					mirrorWave: true,
					durationInSeconds: 144,
				}}
				// Determine the length of the video based on the duration of the audio file
				calculateMetadata={({ props }) => {
					return {
						durationInFrames: props.durationInSeconds * fps,
						props,
					};
				}}
			/>
		</>
	);
};
