function diagonalSpeed(s) {
  return Math.sqrt(Math.pow(s, 2) / 2);
}

function direction(x1, y1, x2, y2) {
  var opp = y2 - y1;
  var adj = x2 - x1;

  if (adj == 0 && opp >= 0) {
    return PI / 2;
  } else if (adj == 0 && opp < 0) {
    return (3 * PI) / 2;
  }

  var angle = Math.atan(opp / adj);

  if (adj < 0) {
    return angle + PI;
  } else {
    if (angle < 0) angle += 2 * PI;
    return angle;
  }
}

function inside(t, x1, x2) {
  if ((t >= x1 && t <= x2) || (t >= x2 && t <= x1)) return true;
  return false;
}

function quadraticSolv(a, b, c) {
  var insq = Math.pow(b, 2) - 4 * a * c;

  var x1 = (-b + Math.sqrt(insq)) / (2 * a);
  var x2;
  if (insq == 0) x2 = x1;
  else x2 = (-b - Math.sqrt(insq)) / (2 * a);

  return [x1, x2];
}

function interceptCircs(circ1, circ1dia, circ2, circ2dia) {
  var rad1 = circ1dia / 2;
  var rad2 = circ2dia / 2;
  if (dist(circ1.x, circ1.y, circ2.x, circ2.y) <= rad1 + rad2) return true;
  return false;
}

//copied from https://www.geeksforgeeks.org/check-if-any-point-overlaps-the-given-circle-and-rectangle/
function interceptCircRect(circ, circdia, rect, rectw, recth) {
  var rad = circdia / 2;
  var rx1 = rect.x - rectw / 2;
  var rx2 = rect.x + rectw / 2;
  var ry1 = rect.y - recth / 2;
  var ry2 = rect.y + recth / 2;

  var Xn = max(rx1, min(circ.x, rx2));
  var Yn = max(ry1, min(circ.y, ry2));

  var Dx = Xn - circ.x;
  var Dy = Yn - circ.y;
  return Dx * Dx + Dy * Dy <= rad * rad;
}

function interceptLineRect(l1, l2, s1, s2) {
  /*
        Temporary stuff
    */

  //when the first point is inside the rectangle
  if (l1.x >= s1.x && l1.y >= s1.y && l1.x <= s2.x && l1.y <= s2.y) return true;
  //when the second point is inside the rectangle
  if (l2.x >= s1.x && l2.y >= s1.y && l2.x <= s2.x && l2.y <= s2.y) return true;

  //prevents from doing unnecesary math
  var linelen = dist(l1.x, l1.y, l2.x, l2.y);
  if (linelen <= abs(s1.x - s2.x) || linelen <= abs(s1.y - s2.y)) return false;

  //when the line has the same x value everywhere.
  if (l1.x == l2.x) {
    if (
      l1.x >= s1.x &&
      l1.x <= s2.x &&
      !((l1.y <= s1.y && l2.y <= s1.y) || (l1.y >= s2.y && l2.y >= s2.y))
    )
      return true;
    else return false;
  }
  //**** */

  //linear solution
  //y = mx + b
  var m = (l2.y - l1.y) / (l2.x - l1.x);
  var b = l1.y - l1.x * m;
  var intercept;

  if (m == 0) {
    if (b == s1.y || b == s2.y) return true;
  } else {
    intercept = (s1.y - b) / m;
    if (inside(intercept, s1.x, s2.x) && inside(intercept, l1.x, l2.x))
      return true;

    intercept = (s2.y - b) / m;
    if (inside(intercept, s1.x, s2.x) && inside(intercept, l1.x, l2.x))
      return true;
  }

  intercept = s1.x * m + b;
  if (inside(intercept, s1.y, s2.y) && inside(intercept, l1.y, l2.y))
    return true;

  intercept = s2.x * m + b;
  if (inside(intercept, s1.y, s2.y) && inside(intercept, l1.y, l2.y))
    return true;

  return false;
}

function interceptLineCirc(l1, l2, cent, rad) {
  //if either of 2 points intercept with the circle
  if (
    dist(l1.x, l1.y, cent.x, cent.y) <= rad ||
    dist(l2.x, l2.y, cent.x, cent.y) <= rad
  )
    return true;
  if (l1.x == l2.x) {
    if (rad >= Math.pow(l1.x, 2)) {
      var y = Math.sqrt(rad - Math.pow(l1.x, 2));
      if (inside(y, l1.y, l2.y)) return true;
      if (inside(-y, l1.y, l2.y)) return true;
    } else {
      return false;
    }
  }

  //prevents from doing unnecesary math
  if (dist(l1.x, l1.y, l2.x, l2.y) <= 2 * rad) return false;

  var x1 = l1.x - cent.x;
  var x2 = l2.x - cent.x;
  var y1 = l1.y - cent.y;
  var y2 = l2.y - cent.y;

  var m = (y2 - y1) / (x2 - x1);
  var bline = y1 - x1 * m;
  var a = Math.pow(m, 2) + 1;
  var b = 2 * bline * m;
  var c = Math.pow(bline, 2) - Math.pow(rad, 2);
  m = undefined;
  bline = undefined;

  if (Math.pow(b, 2) - 4 * a * c < 0) return false;
  var x = quadraticSolv(a, b, c);
  if (inside(x[0], x1, x2)) return true;

  return false;
}

//random x-y position on a perimeter
function randomRectPerimiterPos(sizex, sizey) {
  var randperim = random(2 * sizex + 2 * sizey);
  var xpos = 0;
  var ypos = 0;

  if (randperim > sizex) {
    randperim -= sizex;
    xpos = sizex;
  } else {
    xpos = randperim;
    return [xpos, ypos];
  }

  if (randperim > sizey) {
    randperim -= sizey;
    ypos = sizey;
  } else {
    ypos = randperim;
    return [xpos, ypos];
  }

  if (randperim > sizex) {
    randperim -= sizex;
    xpos = 0;
  } else {
    xpos -= randperim;
    return [xpos, ypos];
  }

  if (randperim > sizey) {
    randperim -= sizey;
    xpos = 0;
  } else {
    ypos -= randperim;
    return [xpos, ypos];
  }

  return [xpos, ypos];
}

function interceptLines(l1, l2, l3, l4) {}

function closestAngle(source, target, increment) {
  if (abs(source + 2 * Math.PI - (target + 2 * Math.PI)) <= increment)
    return target;
  var sh = source + Math.PI;
  if (sh > 2 * Math.PI) sh -= 2 * Math.PI;
  if (sh > target) source += increment;
  if (sh < target) source -= increment;

  if (source < 0) return source + 2 * Math.PI;
  if (source > 2 * Math.PI) return source - 2 * Math.PI;
  return source;
}

function isOutOfBound(x, y, roomdist, width, height) {
  if (
    x >= width + roomdist ||
    x <= -roomdist ||
    y >= height + roomdist ||
    y <= -roomdist
  )
    return true;
  return false;
}
