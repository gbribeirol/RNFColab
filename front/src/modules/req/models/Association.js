export default class Association {
  constructor (param = { req: null }) {
    this.req = param.req || null
    this.correlationAssociation = param.correlationAssociation || null
    this.refinementAssociation = param.refinementAssociation || null
    this.justificationOfCorrelation = param.justificationOfCorrelation || ''
    this.justificationOfRefinement = param.justificationOfRefinement || ''
    this.finalPosition = param.finalPosition || ''
    this.originOfPosition = param.originOfPosition || ''
  }
}

// export default class Association {
//   constructor (param = {
//     req: null,
//     correlationAssociation: null,
//     refinementAssociation: null,
//     justificationOfCorrelation: '',
//     justificationOfRefinement: ''
//   }) {
//     this.req = param.req
//     this.correlationAssociation = param.correlationAssociation
//     this.refinementAssociation = param.refinementAssociation
//     this.justificationOfCorrelation = param.justificationOfCorrelation
//     this.justificationOfRefinement = param.justificationOfRefinement
//   }
// }
