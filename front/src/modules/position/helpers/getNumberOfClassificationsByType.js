/* eslint-disable camelcase */
export default function getNumberOfClassificationsByType (classifications) {
  return [
    { label: 'Relevante', value: classifications.filter(e => e.classification.label === 'Relevante').length },
    { label: 'Informativo', value: classifications.filter(e => e.classification.label === 'Informativo').length }
    // { label: 'Inconsistente', value: classifications.filter(e => e.classification.label === 'Inconsistente').length.pad(5) }
  ]
}
