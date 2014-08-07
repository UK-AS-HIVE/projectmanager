$.fn.editable.defaults.mode = "inline"
$.fn.editable.defaults.showbuttons = false
$.fn.editable.defaults.emptytext = null
$.fn.editable.defaults.onblur = "submit"

Session.setDefault "statusFilter", "In Progress"
Session.setDefault "priorityFilter", "Any"
Session.setDefault "sort", "Time Entered"
notDone = [ "In Progress", "Not Scheduled", "On Hold", "" ]

Template.projects.projectList = ->
  statusFilter = Session.get("statusFilter")
  priorityFilter = [ Session.get("priorityFilter") ]
  sortBy = undefined
  order = undefined
  switch Session.get("sort")
    when "Time Entered"
      sortBy = "time"
      order = -1
    when "Name"
      sortBy = "name"
      order = 1
    when "Date"
      sortBy = "date"
      order = -1
  mySort = sort: {}
  mySort.sort[sortBy] = order
  priorityFilter = [ "High Priority", "Low Priority", "", `undefined` ]  unless priorityFilter.indexOf("Any") is -1
  if statusFilter is "All"
    Projects.find
      priority:
        $in: priorityFilter
    , mySort
  else if statusFilter is "No Status"
    Projects.find status: ""
  else if statusFilter is "Done"
    Projects.find
      status:
        $nin: notDone

      priority:
        $in: priorityFilter
    , mySort
  else
    Projects.find
      status: statusFilter
      priority:
        $in: priorityFilter
    , mySort

Template.imageList.images = ->
  Thumbnails.find()

Template.projects.events
  "click .editableName": (e, tmpl) ->
    projectId = @_id
    console.log projectId
    $(e.target).editable
      type: "text"
      success: (response, newValue) ->
        newValue = null  if newValue is ""
        Projects.update projectId,
          $set:
            name: newValue


    $(e.target).editable "show"

  "click .editableStatus": (e, tmpl) ->
    projectId = @_id
    currentStatus = e.target.text
    $(e.target).editable
      type: "select"
      show: true
      value: currentStatus
      showbuttons: false
      source: [
        value: "In Progress"
        text: "In Progress"
      ,
        value: "Not Scheduled"
        text: "Not Scheduled"
      ,
        value: "On Hold"
        text: "On Hold"
      ,
        value: "Done"
        text: "Done"
       ]
      success: (response, newValue) ->
        newValue = null  if newValue is ""
        Projects.update projectId,
          $set:
            status: newValue


    $(e.target).editable "show"

  "click .editableDescription": (e, tmpl) ->
    projectId = @_id
    currentDescription = e.target.text
    currentDescription = ""  if currentDescription is "Enter a Description"
    $(e.target).editable
      type: "textarea"
      value: currentDescription
      showbuttons: true
      width: 200
      rows: 3
      success: (response, newValue) ->
        newValue = null  if newValue is ""
        Projects.update projectId,
          $set:
            description: newValue


    $(e.target).editable "show"

  "click .editableOwner": (e, tmpl) ->
    projectId = @_id
    currentOwner = e.target.text
    console.log currentOwner
    currentOwner = ""  if currentOwner is "No Owner"
    $(e.target).editable
      type: "text"
      value: currentOwner
      success: (response, newValue) ->
        newValue = null  if newValue is ""
        Projects.update projectId,
          $set:
            owner: newValue


    $(e.target).editable "show"

  "click .editablePlatform": (e, tmpl) ->
    projectId = @_id
    currentPlatform = e.target.text
    currentPlatform = ""  if currentPlatform is "Add Platform"
    $(e.target).editable
      type: "text"
      value: currentPlatform
      success: (response, newValue) ->
        newValue = null  if newValue is ""
        Projects.update projectId,
          $set:
            platform: newValue


    $(e.target).editable "show"

  "click .editableType": (e, tmpl) ->
    projectId = @_id
    currentType = e.target.text
    currentType = ""  if currentType is "Add Type"
    $(e.target).editable
      type: "text"
      value: currentType
      success: (response, newValue) ->
        newValue = null  if newValue is ""
        Projects.update projectId,
          $set:
            type: newValue


    $(e.target).editable "show"

  "click .editablePriority": (e, tmpl) ->
    projectId = @_id
    currentPriority = e.target.text
    $(e.target).editable
      type: "select"
      show: true
      value: currentPriority
      showbuttons: false
      source: [
        value: "Low Priority"
        text: "Low Priority"
      ,
        value: "High Priority"
        text: "High Priority"
       ]
      success: (response, newValue) ->
        newValue = null  if newValue is ""
        Projects.update projectId,
          $set:
            priority: newValue


    $(e.target).editable "show"

  "click .editableDate": (e, tmpl) ->
    projectId = @_id
    currentDate = e.target.text
    currentDate = ""  if currentDate is "Enter a date"
    $(e.target).editable
      value: currentDate
      emptytext: "Enter a date"
      inputclass: "editableDatePicker"
      showbuttons: true
      success: (response, newValue) ->
        newValue = null  if newValue is ""
        Projects.update projectId,
          $set:
            date: newValue


    $(e.target).editable "show"
    $(".editableDatePicker").datepicker autoclose: true
    $(".editableDatePicker").datepicker "show"

  "click .editableNotes": (e, tmpl) ->
    projectId = @_id
    currentNotes = e.target.text
    currentNotes = ""  if currentNotes is "Add Notes"
    $(e.target).editable
      type: "textarea"
      value: currentNotes
      showbuttons: true
      cols: 20
      rows: 3
      inputclass: "notes-input"
      success: (response, newValue) ->
        newValue = null  if newValue is ""
        Projects.update projectId,
          $set:
            notes: newValue


    $(e.target).editable "show"

  "click .addTag": (e, tmpl) ->
    projectId = @_id
    $(e.target).editable
      value: "" # need to make value always blank
      deftaulValue: "hi"
      display: false
      success: (response, newValue) ->
        tags = Projects.findOne(projectId).tags
        if tags is `undefined` or tags is ""
          tags = [ newValue ]
        else
          tags.push newValue
        Projects.update projectId,
          $set:
            tags: tags


    $(e.target).editable "show"

  "click .editURL": (e, tmpl) ->
    console.log "clicked"
    e.preventDefault()
    e.stopPropagation()
    projectId = @_id
    currentURL = @url
    unless currentURL is ""
      URL = $(e.target).closest("td").find(".editableURL")
      $(URL).editable
        type: "text"
        value: currentURL
        showbuttons: false
        inputclass: "URLinput"
        success: (response, newValue) ->
          newValue = null  if newValue is ""
          Projects.update projectId,
            $set:
              url: newValue

          thumbnailObject = Thumbnails.findOne("metadata.projectId": projectId)
          screenshotObject = Screenshots.findOne("metadata.projectId": projectId)
          Thumbnails.remove thumbnailObject._id
          Screenshots.remove screenshotObject._id
          Meteor.call "getScreenshot", newValue, projectId

    unless currentURL
      URL = $(e.target)
      $(URL).editable
        type: "text"
        value: "http://"
        showbuttons: false
        success: (response, newValue) ->
          newValue = null  if newValue is ""
          Projects.update projectId,
            $set:
              url: newValue


    (URL).editable "toggle"
    (URL).off "click"

  "click .deleteTag": (e, tmpl) ->
    currentTag = @toString()
    projectId = $(e.target).closest("td").attr("id").toString().substr(5)
    
    #If block to handle ObjectID types (from mongoimport)
    unless projectId.indexOf("\"") is -1
      projectId = projectId.substr(projectId.indexOf("\"") + 1, 24)
      projectId = new Meteor.Collection.ObjectID(projectId)
    
    # console.log(projectId);
    
    #
    Projects.update projectId,
      $pull:
        tags: currentTag


Template.projectRow.events
  "click .parent": (e, tmpl) ->
    if e.target.tagName is "TD"
      e = tmpl.find(".details")
      $(e).toggle()

  "click .deleteProject": (e, tmpl) ->
    projectId = @_id
    Meteor.call "deleteScreenshot", projectId
    Projects.remove @_id
    Screenshots.remove Screenshots.findOne("metadata.projectId": projectId)._id
    Thumbnails.remove Thumbnails.findOne("metadata.projectId": projectId)._id

  "click .screenshotToggle": (e, tmpl) ->
    e = tmpl.find(".screenshotToggle")
    enabled = e.checked
    console.log enabled
    Projects.update @_id,
      $set:
        screenshotEnabled: enabled

    path = @screenshotPath
    console.log path
    Meteor.call "getScreenshot", @url, @_id  if path is `undefined`

  "click .refreshScreenshot": ->
    
    #check if thumbnail and screenshot exists and remove them from collection if true.
    thumbnailObject = Thumbnails.findOne("metadata.projectId": @_id)
    screenshotObject = Screenshots.findOne("metadata.projectId": @_id)
    if thumbnailObject and screenshotObject
      Thumbnails.remove thumbnailObject._id
      Screenshots.remove screenshotObject._id
    Meteor.call "getScreenshot", @url, @_id

Template.projectRow.thumbnailPath = (id) ->
  newThumbnail = [ Thumbnails.findOne("metadata.projectId": id) ]
  newThumbnail

Template.projectRow.imagePath = (id) ->
  newImage = [ Screenshots.findOne("metadata.projectId": id) ]
  newImage

Template.tags.tagUrl = ->
  currentTag = @value
  "/" + currentTag

Template.projectRow.formattedUrl = ->
  url = @url
  return ""  unless url
  url = "http://" + url  unless url.substring(0, 7) is "http://"
  url

Template.filters.helpers
  getStatusFilter: ->
    Session.get "statusFilter"

  getPriorityFilter: ->
    priorityFilter = Session.get("priorityFilter")
    priorityFilter

  getSort: ->
    Session.get "sort"

Template.filters.events
  "click .changeStatusFilter": (e) ->
    newFilter = e.target.text
    Session.set "statusFilter", newFilter

  "click .changePriorityFilter": (e) ->
    newFilter = e.target.text
    Session.set "priorityFilter", newFilter

  "click .changeSort": (e, tmpl) ->
    newSort = e.target.text
    Session.set "sort", newSort


# ESCAPE to collapse all rows.
$(document).keyup (e) ->
  if e.keyCode is 27
    details = document.getElementsByClassName("details")
    i = 0

    while i < details.length
      $(details[i]).hide()
      i++

Template.projects.rendered = ->
  scrollToTop()

scrollToTop = ->
  $(document).ready ->
    $(window).scroll ->
      if $(this).scrollTop() > 100
        $("#goTop").stop().animate
          top: "20px"
        , 1000
      else
        $("#goTop").stop().animate
          top: "-100px"
        , 1000

    $("#goTop").click ->
      $("html, body").stop().animate
        scrollTop: 0
      , 1000, ->
        $("#goTop").stop().animate
          top: "-100px"
        , 1000


