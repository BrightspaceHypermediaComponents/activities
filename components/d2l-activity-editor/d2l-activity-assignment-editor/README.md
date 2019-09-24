# Assignment Activity Editor

## d2l-activity-assignment-editor

The `d2l-activity-assignment-editor` can be used to edit assignments

### Usage

```html
<script type="module">
  import 'd2l-activities/components/d2l-activity-editor/d2l-activity-assignment-editor/d2l-activity-assignment-editor.js';
</script>
<d2l-activity-assignment-editor
	token="TOKEN"
	href="https://f5aa43d7-c082-485c-84f5-4808147fe98a.activities.api.dev.brightspace.com/activities/6606_2000_7/usages/123065"
></d2l-activity-assignment-editor>
```

***Properties:***

* `token` : An auth token or auth token function for authorizing the fetch of the activity
* `href` : An activity usage resource URL for the activity to be edited

