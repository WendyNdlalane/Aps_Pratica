// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AnalyticsSchema from 'App/Models/AnalyticsSchema'
import { Iterator } from './Iterator';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';


export default class AnalyticsController {

 function detailAnalytics(body) {

  const analytics = await AnalyticsSchema.findBy('activityID', body.activityID);
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
  analytics.hash = body.activityID + body.inveniraStdID
  analytics.save()
}


function updadateAnalytics(body) {
  const analytics = await AnalyticsSchema.findBy('activityID', body.activityID);
  if (analytics) {
    if (body.interaction == 'downloadApp') {
      analytics.downloadApp = true
    } else if (body.interaction == 'viewModel') {
      analytics.viewModel = true
    } else if (body.interaction == 'valQueries') {
      analytics.numQueries = body.numQueries
    }
  }
  return
}

function returnAnalytics(body) {
  const analytics = await AnalyticsSchema.findBy('activityID', body.activityID);
  var Iterator = new Iterator(analytics)
  const numQueries = Iterator.first().numQueries
  const maxIter = numQueries + 3
  let arr = []
  Iterator.each((item) => {
    let totalIter = 0;
    let quanAnalytics: { name: string, value: any }[] = [];
    let percQueryCorrect = 0;

    if (item.access) totalIter += 1;
    if (item.downloadApp) totalIter += 1;
    if (item.viewModel) totalIter += 1;

    const totalAttempts = item.studentData.length;
    if (totalAttempts > 0) {
      percQueryCorrect = (getTrue(item.studentData) / numQueries) * 100;
    } else {
      percQueryCorrect = 0;
    }

    let obj = { name: 'Acesso à atividade', value: item.access };
    quanAnalytics.push(obj);
    obj = { name: 'Download app', value: item.downloadApp };
    quanAnalytics.push(obj);
    obj = { name: 'Ver modelo de dados:', value: item.viewModel };
    quanAnalytics.push(obj);
    obj = { name: 'Tentativas de resolução:', value: totalAttempts };
    quanAnalytics.push(obj);
    obj = { name: 'Tentativas corretas:', value: getTrue(item.studentData) };
    quanAnalytics.push(obj);
    obj = { name: 'Tentativas corretas (%):', value: percQueryCorrect.toFixed(2) };
    quanAnalytics.push(obj);
    obj = { name: 'Progresso na atividade (%):', value: (((getTrue(item.studentData) + totalIter) / maxIter) * 100).toFixed(2) };
    quanAnalytics.push(obj);
    obj = {
      inveniraStdID: item.inveniraStdID,
      quantAnalytics: quanAnalytics,
      qualAnalyticsURL: `http://localhost:3000/qualanalytics/?inveniraStdID=${item.inveniraStdID}&activityID=${body.activityID}`,
    };

    analytics.push(obj);

    callback(analytics);
  })

}


function getTrue(item: any[]): number {
  let conta = 0;
  let result = [];
  let map = new Map();
  type QueryResult = {
    idQuery: any;
    result: any;
  };
  for (const i of item) {
    if (!map.has(i.idQuery) && i.result == true) {
      conta = conta + 1;
      map.set(i.idQuery, true);
      result.push(QueryResult(i.idQuery, i.result)));
    }
  }
  return conta;
}




