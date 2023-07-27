import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DeploySchema extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'activityID' })
  public activityID: number;

  @column({ columnName: 'inveniraStdID' })
  public inveniraStdID: number;

  @column({ columnName: 'json_params', serializeAs: 'jsonParams' })
  public jsonParams: {
    summary: string;
    selectedBd: number;
    selectedQueries: any[];
  };

  @column({ columnName: 'hash' })
  public hash: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
