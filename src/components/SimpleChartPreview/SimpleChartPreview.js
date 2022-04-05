import React, { useRef, useEffect } from 'react'
import { chart as rawChart } from '@rawgraphs/rawgraphs-core'

export default function SimpleChartPreview({
  currentChart,
  dataset,
  mapping,
  dataTypes,
  visualOptions,
  contentId,
}) {
  const domRef = useRef()

  useEffect(() => {
    const viz = rawChart(currentChart, {
      data: dataset,
      mapping,
      dataTypes,
      visualOptions,
    })
    try {
      viz.renderToDOM(domRef.current)
      if (contentId) {
        window.parent.postMessage(
          { event: 'raw-preview-ready', visualOptions, contentId },
          '*'
        )
      }
    } catch (e) {
      console.log('chart error', e)
    }
    // return currentChart.renderToDOM(ref.current)
  }, [contentId, currentChart, dataTypes, dataset, mapping, visualOptions])

  return <div ref={domRef}></div>
}
