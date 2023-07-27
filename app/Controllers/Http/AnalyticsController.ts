// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AnalyticsSchema from 'App/Models/AnalyticsSchema'


export default class AnalyticsController {

 function detailAnalytics(body) {

  const analytics = await  AnalyticsSchema.findBy('activityID', body.activityID);
  console.log(analytics)
  return analytics
 }

  function fistAccess(body) {
   const analytics = new AnalyticsSchema()
    analytics.activityID = body.activityID
    analytics.inveniraStdID = body.inveniraStdID
    analytics.access = true
    analytics.downloadApp = false
    analytics.viewModel = false
    analytics.numQueries = 0
    analytics.studentData = []
    analytics.hash = body.activityID+body.inveniraStdID
    analytics.save()
}




