import * as fp from "fingerpose";

export const _peaceGesture = new fp.GestureDescription("peace");

_peaceGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.5);
_peaceGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 0.5);
_peaceGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
_peaceGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);

// index:
_peaceGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
_peaceGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.VerticalUp,
  0.75
);
_peaceGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);

// middle:
_peaceGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
_peaceGesture.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.VerticalUp,
  1.0
);
_peaceGesture.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.DiagonalUpLeft,
  0.75
);

// ring:
_peaceGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
_peaceGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 0.2);
_peaceGesture.addDirection(
  fp.Finger.Ring,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
_peaceGesture.addDirection(
  fp.Finger.Ring,
  fp.FingerDirection.HorizontalLeft,
  0.2
);

// pinky:
_peaceGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
_peaceGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 0.2);
_peaceGesture.addDirection(
  fp.Finger.Pinky,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
_peaceGesture.addDirection(
  fp.Finger.Pinky,
  fp.FingerDirection.HorizontalLeft,
  0.2
);

// give additional weight to index and ring fp.fingers
_peaceGesture.setWeight(fp.Finger.Index, 2);
_peaceGesture.setWeight(fp.Finger.Middle, 2);

export const _okGesture = new fp.GestureDescription("sure");
for (let finger of [fp.Finger.Pinky, fp.Finger.Ring, fp.Finger.Middle]) {
  _okGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.75);
  _okGesture.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.5);
  _okGesture.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.5);
  _okGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 0.5);
}

_okGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1);
_okGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1);

export const _raiseGesture = new fp.GestureDescription("raise");
_raiseGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
_raiseGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);
_raiseGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
_raiseGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 1.0);
_raiseGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
_raiseGesture.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.VerticalUp,
  1.0
);
_raiseGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
_raiseGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
_raiseGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
_raiseGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
