import { useAudioData, visualizeAudio } from '@remotion/media-utils';
import React, { useEffect, useRef, useState } from 'react';
import {
	AbsoluteFill,
	Audio,
	continueRender,
	delayRender,
	Img,
	useCurrentFrame,
	useVideoConfig,
	staticFile,
} from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { wipe } from '@remotion/transitions/wipe';
import { clockWipe } from '@remotion/transitions/clock-wipe';

export const fps = 30;

import { PaginatedSubtitles } from './Subtitles';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

export const AudioGramSchema = z.object({
	durationInSeconds: z.number().positive(),
	audioOffsetInSeconds: z.number().min(0),
	subtitlesFileName: z.string().refine((s) => s.endsWith('.srt'), {
		message: 'Subtitles file must be a .srt file',
	}),
	subtitlesViFileName: z.string().refine((s) => s.endsWith('.srt'), {
		message: 'Subtitles file must be a .srt file',
	}),
	audioFileName: z.string().refine((s) => s.endsWith('.mp3'), {
		message: 'Audio file must be a .mp3 file',
	}),
	coverImgFileName: z
		.string()
		.refine(
			(s) =>
				s.endsWith('.jpg') ||
				s.endsWith('.jpeg') ||
				s.endsWith('.png') ||
				s.endsWith('.bmp'),
			{
				message: 'Image file must be a .jpg / .jpeg / .png / .bmp file',
			},
		),
	titleText: z.string(),
	titleColor: zColor(),
	waveColor: zColor(),
	subtitlesTextColor: zColor(),
	subtitlesLinePerPage: z.number().int().min(0),
	subtitlesLineHeight: z.number().int().min(0),
	subtitlesZoomMeasurerSize: z.number().int().min(0),
	onlyDisplayCurrentSentence: z.boolean(),
	mirrorWave: z.boolean(),
	waveLinesToDisplay: z.number().int().min(0),
	waveFreqRangeStartIndex: z.number().int().min(0),
	waveNumberOfSamples: z.enum(['32', '64', '128', '256', '512']),
});

type AudiogramCompositionSchemaType = z.infer<typeof AudioGramSchema>;

const AudioViz: React.FC<{
	waveColor: string;
	numberOfSamples: number;
	freqRangeStartIndex: number;
	waveLinesToDisplay: number;
	mirrorWave: boolean;
	audioSrc: string;
}> = ({
	waveColor,
	numberOfSamples,
	freqRangeStartIndex,
	waveLinesToDisplay,
	mirrorWave,
	audioSrc,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const audioData = useAudioData(audioSrc);

	if (!audioData) {
		return null;
	}

	const frequencyData = visualizeAudio({
		fps,
		frame,
		audioData,
		numberOfSamples, // Use more samples to get a nicer visualisation
	});

	// Pick the low values because they look nicer than high values
	// feel free to play around :)
	const frequencyDataSubset = frequencyData.slice(
		freqRangeStartIndex,
		freqRangeStartIndex +
			(mirrorWave ? Math.round(waveLinesToDisplay / 2) : waveLinesToDisplay),
	);

	const frequenciesToDisplay = mirrorWave
		? [...frequencyDataSubset.slice(1).reverse(), ...frequencyDataSubset]
		: frequencyDataSubset;

	return (
		<div className="audio-viz">
			{frequenciesToDisplay.map((v, i) => {
				return (
					<div
						key={i}
						className="bar"
						style={{
							minWidth: '1px',
							backgroundColor: waveColor,
							height: `${500 * Math.sqrt(v)}%`,
						}}
					/>
				);
			})}
		</div>
	);
};

export const AudiogramComposition: React.FC<AudiogramCompositionSchemaType> = ({
	subtitlesFileName,
	subtitlesViFileName,
	audioFileName,
	coverImgFileName,
	titleText,
	titleColor,
	subtitlesTextColor,
	subtitlesLinePerPage,
	waveColor,
	waveNumberOfSamples,
	waveFreqRangeStartIndex,
	waveLinesToDisplay,
	subtitlesZoomMeasurerSize,
	subtitlesLineHeight,
	onlyDisplayCurrentSentence,
	mirrorWave,
	audioOffsetInSeconds,
}) => {
	const { durationInFrames, width, height } = useVideoConfig();
	const frame = useCurrentFrame();
	const countdown = Math.max(0, 3 - Math.floor(frame / fps)); // Countdown from 3 to 0

	const [handle] = useState(() => delayRender());
	const [subtitles, setSubtitles] = useState<string | null>(null);
	const [subtitlesVi, setSubtitlesVi] = useState<string | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetch(subtitlesFileName)
			.then((res) => res.text())
			.then((text) => {
				setSubtitles(text);
				continueRender(handle);
			})
			.catch((err) => {
				console.log('Error fetching subtitles', err);
			});
	}, [handle, subtitlesFileName]);

	useEffect(() => {
		fetch(subtitlesViFileName)
			.then((res) => res.text())
			.then((text) => {
				setSubtitlesVi(text);
				continueRender(handle);
			})
			.catch((err) => {
				console.log('Error fetching subtitles', err);
			});
	}, [handle, subtitlesViFileName]);

	if (!subtitles || !subtitlesVi) {
		return null;
	}

	const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);

	return (
		<div ref={ref}>
			<AbsoluteFill>
				<TransitionSeries>
					<TransitionSeries.Sequence durationInFrames={120}>
						<div
							className="container center"
							style={{
								fontFamily: 'IBM Plex Sans',
							}}
						>
							<div className="row">
								<Img className="logo-full" src={coverImgFileName} />
							</div>
							<div className="row">
								<p className="claims" style={{ color: titleColor }}>
									This video made by SaigonTechies
								</p>
							</div>
							<div className="row">
								<p className="countdown">{countdown}</p>
							</div>
						</div>
					</TransitionSeries.Sequence>
					<TransitionSeries.Transition
						presentation={wipe()}
						timing={linearTiming({ durationInFrames: 30 })}
					/>
					<TransitionSeries.Sequence durationInFrames={durationInFrames - 120}>
						<Audio pauseWhenBuffering src={audioFileName} />

						<div
							className="container"
							style={{
								fontFamily: 'IBM Plex Sans',
							}}
						>
							<div className="row">
								<Img
									className="cover"
									style={{ width: '20%' }}
									src={staticFile('logo-small.png')}
								/>
								<div className="title" style={{ color: titleColor }}>
									{titleText}
								</div>
							</div>
							<div>
								<AudioViz
									audioSrc={audioFileName}
									mirrorWave={mirrorWave}
									waveColor={waveColor}
									numberOfSamples={Number(waveNumberOfSamples)}
									freqRangeStartIndex={waveFreqRangeStartIndex}
									waveLinesToDisplay={waveLinesToDisplay}
								/>
							</div>
							<Img
								src={staticFile('ship.webp')}
								width={width}
								className="ship"
							/>
							<div
								style={{ lineHeight: `${subtitlesLineHeight}px` }}
								className="captions"
							>
								<PaginatedSubtitles
									subtitles={subtitles}
									startFrame={audioOffsetInFrames}
									endFrame={audioOffsetInFrames + durationInFrames}
									linesPerPage={subtitlesLinePerPage}
									subtitlesTextColor={subtitlesTextColor}
									subtitlesZoomMeasurerSize={subtitlesZoomMeasurerSize}
									subtitlesLineHeight={subtitlesLineHeight}
									onlyDisplayCurrentSentence={onlyDisplayCurrentSentence}
								/>
								<hr />
								<PaginatedSubtitles
									subtitles={subtitlesVi}
									startFrame={audioOffsetInFrames}
									endFrame={audioOffsetInFrames + durationInFrames}
									linesPerPage={subtitlesLinePerPage}
									subtitlesTextColor={subtitlesTextColor}
									subtitlesZoomMeasurerSize={subtitlesZoomMeasurerSize}
									subtitlesLineHeight={subtitlesLineHeight}
									onlyDisplayCurrentSentence={onlyDisplayCurrentSentence}
								/>
							</div>
						</div>
					</TransitionSeries.Sequence>
					<TransitionSeries.Transition
						presentation={clockWipe({ width, height })}
						timing={linearTiming({ durationInFrames: 30 })}
					/>
					<TransitionSeries.Sequence durationInFrames={durationInFrames}>
						<div
							className="container center"
							style={{
								fontFamily: 'IBM Plex Sans',
							}}
						>
							<div className="row">
								<Img className="logo-full" src={coverImgFileName} />
							</div>
							<div className="row">
								<p className="claims" style={{ color: titleColor }}>
									Thank you for watching
								</p>
							</div>
						</div>
					</TransitionSeries.Sequence>
				</TransitionSeries>
			</AbsoluteFill>
		</div>
	);
};
