import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, RoundedRect } from '@shopify/react-native-skia';

// Function to generate fake FFT data
const generateFakeFFT = (size = 32, maxAmplitude = 100) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxAmplitude));

const MusicFFTVisualizer = () => {
  const [fftData, setFftData] = useState(generateFakeFFT());

  // Update FFT data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setFftData(generateFakeFFT(32, 100)); // Update every 200ms
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Bar properties
  const barWidth = 8;
  const spacing = 4;
  const canvasHeight = 60; // Slightly reduced height for visualizer

  return (
    <View style={styles.container}>
      <Canvas
        style={{
          width: fftData.length * (barWidth + spacing),
          height: canvasHeight,
        }}
      >
        {fftData.map((value, index) => {
          const height = (value / 100) * canvasHeight;
          const x = index * (barWidth + spacing);
          const y = canvasHeight - height;

          return (
            <RoundedRect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={height}
              r={4} // Corner radius for all edges
              color="#FF6B6B" // Red-pink color similar to the play button
            />
          );
        })}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end', // Always stick to the bottom
    alignItems: 'center',
    backgroundColor: 'transparent', // Match background to player
    paddingHorizontal: 10,
    marginBottom: 10, // Add margin if necessary for spacing
  },
});

export default MusicFFTVisualizer;
