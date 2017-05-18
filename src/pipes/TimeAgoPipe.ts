import { Pipe, PipeTransform } from '@angular/core';
import * as humanize from 'humanize';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(time: number) {
    return humanize.relativeTime(time);
  }
}
