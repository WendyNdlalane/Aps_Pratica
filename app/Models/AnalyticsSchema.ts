  import { DateTime } from 'luxon'
  import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

  export default class AnalyticsSchema extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column({ columnName: 'activityID', serializeAs: 'activityID' })
    public activityID: number

    @column({ columnName: 'inveniraStdID', serializeAs: 'inveniraStdID' })
    public inveniraStdID: number

    @column({ columnName: 'access', serializeAs: 'access' })
    public access: boolean

    @column({ columnName: 'downloadApp', serializeAs: 'downloadApp' })
    public downloadApp: boolean

    @column({ columnName: 'viewModel', serializeAs: 'viewModel' })
    public viewModel: boolean

    @column({ columnName: 'numQueries', serializeAs: 'numQueries' })
    public numQueries: number

    @column({ columnName: 'studentData', serializeAs: 'studentData' })
    public studentData: any[]

    @column({ columnName: 'hash', serializeAs: 'hash' })
    public hash: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

  }
