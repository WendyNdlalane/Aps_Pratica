// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AnalyticsSchema from 'App/Models/AnalyticsSchema'
import sha1 from 'sha1'

export default class AnalyticsController {

 function detailAnalytics(body,callback) {

  const analytics = await  AnalyticsSchema.findBy('activityID', body.activityID);
  console.log(analytics)
  return analytics
 }

  function fistAccess(body,callback) {
   const analytics = new AnalyticsSchema()
    analytics.activityID = body.activityID
    analytics.inveniraStdID = body.inveniraStdID
    analytics.access = true
    analytics.downloadApp = false
    analytics.viewModel = false
    analytics.numQueries = 0
    analytics.studentData = []
    analytics.hash = sha1(body.activityID+body.inveniraStdID)
    analytics.save()
}




